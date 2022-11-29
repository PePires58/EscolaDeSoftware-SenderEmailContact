const sendEmailService = require('./services/send-email.service');

exports.lambdaHandler = async (event, context) => {

    try {
        console.log(event);
        console.log(event.headers);

        const allowOrigin = event.headers['access-control-allow-origin'] || '';

        console.log(allowOrigin);

        if (allowOrigin === 'https://dak1pni58hzx7.cloudfront.net') {
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
        }
        return defaultResult(403, { error: 'Erro de CORS' });
    } catch (error) {
        return errorResult(500, error);
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