import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NEXT_PUBLIC_EMAIL,
        pass: process.env.NEXT_PUBLIC_PASSWORD
    }
});

export const mailOptions = (account: string, name: string, statsArr: Array<number>) => {
    const mailOptions = {
        from: process.env.NEXT_PUBLIC_EMAIL,
        to: process.env.NEXT_PUBLIC_EMAIL,
        subject: 'Scrapprtup Daily Report!',
        text: 'Dear customer, we are currently tracking the account: ' + name + '. It has ' + statsArr[0] + ' publications, ' + statsArr[1] + ' account followers '
         + ' & ' + statsArr[2] + ' accounts followed.' + ' If you want to access to this account click on the following link: ' + account + ' Have a nice day Scrapprter!'
    }
    return mailOptions
}