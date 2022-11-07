const sendEmailService = require('./services/send-email.service');

exports.lambdaHandler = async (event, context) => {

    try {
        const body = JSON.parse(event.body);

        await sendEmailService.SendEmail({
            Email: body.Email,
            Mensagem: body.Mensagem
        }).then(() => {
            return defaultResult(200, 'E-mail enviado com sucesso')
        })
            .catch(() => {
                return defaultResult(400, 'Erro ao enviar o e-mail');
            });
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