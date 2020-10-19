import { NextApiRequest, NextApiResponse } from 'next'
import {transporter, mailOptions} from '../../lib/transporter';
import puppeteer from 'puppeteer'

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
      
      const mailOptionsObj = mailOptions(account, name, statsArr);
      const info = await transporter.sendMail(mailOptionsObj);
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