import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: process.env.AWS_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.AWS_USER,
        pass: process.env.AWS_PASS
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