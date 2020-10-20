import { NextApiRequest, NextApiResponse } from 'next'
//import {transporter, mailOptions} from '../../lib/transporter';
//import {mailOptions} from '../../lib/awsParams';
import puppeteer from 'puppeteer'
import nodemailer from 'nodemailer'

// Load the AWS SDK
import AWS from 'aws-sdk'

// Set the configs
AWS.config.update({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_KEY,
    region: 'us-east-2'
});

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
    SES: new AWS.SES({
        apiVersion: '2010-12-01'
    })
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  
    try {

        /* request parameters */
        const {account} = req.body;

        /* puppeteer code */
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto(account);
        await page.waitForSelector('.zwlfE');
        /* account name */
        const name = await page.$eval('.zwlfE div.nZSzR h2', (h2: any) => h2.innerText);
        /* account stats -> [ publications | followers | followed ] */
        let statsArr = [];
        const lis = await page.$$('ul.k9GMp li');
        for (const li of lis) {
            const result = await li.$eval('li.Y8-fY a.-nal3 span.g47SY', (span: any) => span.innerText);
            statsArr.push(result);
        }
        await browser.close();
        
        // send some mail
        const info = await transporter.sendMail({
            from: process.env.NEXT_PUBLIC_EMAIL,
            to: process.env.NEXT_PUBLIC_EMAIL,
            subject: 'Scrapprtup Daily Report!',
            text: 'Dear customer, we are currently tracking the account: ' + name + '. It has ' + statsArr[0] + ' publications, ' + statsArr[1] + ' account followers '
            + ' & ' + statsArr[2] + ' accounts followed.' + ' If you want to access to this account click on the following link: ' + account + ' Have a nice day Scrapprter!'
        })
    
        return res.json({
            message: 'Mail sent successfully',
            body: info
        });
    } catch (err) {
        console.error(err);
        return res.json({
            message: 'Mail service not working !',
            body: err
        });  
    }

}