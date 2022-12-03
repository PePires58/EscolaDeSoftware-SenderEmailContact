const sendEmailService = require('./services/send-email.service');

exports.lambdaHandler = async (event, context) => {

    try {

        const body = JSON.parse(atob(event.body));
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
        return errorResult(500, error);
    }
}

function errorResult(statusCode, errors) {
    return {
        'statusCode': statusCode,
        'body': Buffer.from(JSON.stringify({
            errors: errors
        }), 'base64').toString('base64'),
        'isBase64Encoded': true,
        'headers': {
            'Content-Type': 'application/json'
        }
    };
}

function defaultResult(statusCode, message) {
    return {
        'statusCode': statusCode,
        'body': Buffer.from(JSON.stringify({
            message: message
        }), 'base64').toString('base64'),
        'isBase64Encoded': true,
        'headers': {
            'Content-Type': 'application/json'
        }
    }
}