const nodemailder = require('nodemailer');
const sendEmailValidator = require('./send-email-validator');

exports.SendEmail = async function (emailData) {
    let errors = sendEmailValidator.ValidateObject(emailData);

    if (errors.length > 0)
        return errors;

    const senderEmail = process.env.senderEmail;

    try {
        const transporter = nodemailder.createTransport({
            host: "smtp-mail.outlook.com",
            secureConnection: true,
            port: 587,
            auth: {
                user: process.env.senderEmail,
                pass: process.env.senderPassword
            },
            tls: {
                ciphers: 'SSLv3'
            }
        });

        const emailOptions = {
            from: senderEmail,
            to: process.env.recipientEmail,
            subject: 'Contato treinamento corporativo',
            text: `Olá, meu e-mail é: ${emailData.Email}, estou entrando em contato para:\n${emailData.Mensagem}`
        }

        transporter.sendMail(emailOptions)
            .then(() => console.log('send email with success'))
            .catch(error => errors.push(error));
    } catch (error) {
        errors.push(error);
    }
    return errors;

}