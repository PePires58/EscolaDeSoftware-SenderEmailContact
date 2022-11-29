const sendEmailService = require('./services/send-email.service');

exports.lambdaHandler = async (event, context) => {

    try {
        const body = JSON.parse(event.body);
        const errors = [];

        await sendEmailService.SendEmail({
            Email: body.Email,
            Mensagem: body.Mensagem
        }).then(() => {
            console.log('e-mail sended');
        })
            .catch((error) => {
                console.log('error on send e-mail');
                console.log(error);
                errors.push(error);
            });

        return errors.length > 0 ? defaultResult(400, 'Erro ao enviar o e-mail') :
            defaultResult(200, 'E-mail enviado com sucesso')

    } catch (error) {
        return errorResult(error);
    }
}

function errorResult(statusCode, errors) {
    return {
        'statusCode': statusCode,
        'body': JSON.stringify({
            errors: errors
        }),
        'isBase64Encoded': false,
        'headers': {
            'Content-Type': 'application/json'
        }
    };
}

function errorResult(errors) { return errorResult(500, errors); }

function defaultResult(statusCode, message) {
    return {
        'statusCode': statusCode,
        'body': JSON.stringify({
            message: message
        }),
        'isBase64Encoded': false,
        'headers': {
            'Content-Type': 'application/json'
        }
    }
}