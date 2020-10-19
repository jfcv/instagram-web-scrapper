
export const mailOptions = (account: string, name: string, statsArr: Array<number>) => {

    // Create sendEmail params
     const params = {
        Destination: { /* required */
        ToAddresses: [
            process.env.NEXT_PUBLIC_EMAIL,
            /* more items */
        ]
        },
        Message: { /* required */
        Body: { /* required */
            Html: {
            Charset: "UTF-8",
            Data: 'Dear customer, we are currently tracking the account: ' + name + '. It has ' + statsArr[0] + ' publications, ' + statsArr[1] + ' account followers '
            + ' & ' + statsArr[2] + ' accounts followed.' + ' If you want to access to this account click on the following link: ' + account + ' Have a nice day Scrapprter!'
            },
            Text: {
            Charset: "UTF-8",
            Data: 'Dear customer, we are currently tracking the account: ' + name + '. It has ' + statsArr[0] + ' publications, ' + statsArr[1] + ' account followers '
            + ' & ' + statsArr[2] + ' accounts followed.' + ' If you want to access to this account click on the following link: ' + account + ' Have a nice day Scrapprter!'
            }
        },
        Subject: {
            Charset: 'UTF-8',
            Data: 'Scrapprtup Daily Report!'
        }
        },
        Source: process.env.NEXT_PUBLIC_EMAIL, /* required */
        ReplyToAddresses: [
            process.env.NEXT_PUBLIC_EMAIL,
        /* more items */
        ],
    }

    return params
}

