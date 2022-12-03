const nodemailder = require('nodemailer');

exports.SendEmail = async function (emailData) {
    const senderEmail = process.env.SenderEmail;

    const transporter = nodemailder.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        auth: {
            user: senderEmail.toString(),
            pass: process.env.SenderPassword.toString()
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    const emailOptions = {
        from: senderEmail.toString(),
        to: process.env.RecipientEmail.toString(),
        subject: 'Contato treinamento corporativo',
        text: `Olá, meu e-mail é: ${emailData.Email}, estou entrando em contato para:\n${emailData.Mensagem}`
    }

    console.log(process.env);
    return transporter.sendMail(emailOptions);
}