const sendEmailService = require('./services/send-email.service');

exports.lambdaHandler = async (event, context) => {

    try {
        const body = JSON.parse(event.body);
        console.log('body' + body);

        const errors = [];

        console.log('sending e-mail');
        sendEmailService.SendEmail({
            Email: body.Email,
            Mensagem: body.Mensagem
        }).then((result) => {
            console.log('e-mail sended');
            errors.push(result);
        })
            .catch((error) => {
                console.log('error on send e-mail');
                errors.push(error);
            });

        console.log('returning result');
        return errors.length > 0 ? defaultResult(400, 'Erro ao enviar o e-mail') :
            defaultResult(200, 'E-mail enviado com sucesso');
    } catch (error) {
        return errorResult(error);
    }
}

function errorResult(errors) {
    return {
        'statusCode': 500,
        'body': JSON.stringify({
            errors: errors
        }),
        'isBase64Encoded': false,
        'headers': {
            'Content-Type': 'application/json'
        }
    };
}

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