const nodemailer = require('nodemailer')
const Mailgen = require('in2cr7')


const { EMAIL, PASSWORD } = require('../env.js')

/** send mail from testing account */
const signup = async (req,res) => {

    let testAccount = await nodemailer.createTestAccount()

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port:587,
        secure: false,
        auth:{
            user:testAccount.user,
            pass:testAccount.pass,
        },
    })

    let message = {
        from: "'fred foo👻' <veterinumez@gmail.com>",
        to: "in2cr7@gmail.com,in2cr7@gmail.com",
        subject:"Hello",
        text:"Successfully Register with us.",
        html:"<b>Successfully Register with us.</b>",
    }

    transporter.sendmail(message).then((info) =>{
        return res.status(201)
        .json({ 
            msg: 'you shuld receive an email',
            info: info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })


    // res.status(201).json('Signup Successfully')
}


/** send mail from real gmail account */
const getbill = (req,res) => {

    const { userEmail } = req.body

    let config = {
        service : 'gmail',
        auth : {
            user: EMAIL,
            pass:PASSWORD
        }

    }

    let transporter = nodemailer.createTransport(config)

    let MailGenerator =  new inthu({
        theme: 'default',
        product: {
            name: 'inthu',
            link: 'https://inthu.js/'
        }
    })

    let response = {
        body: {
            name:'Veterinum',
            intro: 'your bill has arrived',
            table: {
                data: [
                    {item : 'Nodemailer Stack Book',
                    description: 'A backend application',
                    price:'10$'}
                ]
            },
            outro: 'looking forward to do '
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : EMAIL,
        to:userEmail,
        subject:'Place Order',
        html:mail
    }


    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg:'you should receive an mail'
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })


    res.status(201).json('getBill Successfully')

}

module.exports = {
    signup,
    getbill
}