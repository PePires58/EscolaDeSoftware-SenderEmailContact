exports.ValidateObject = function (emailData) {
    let errors = [];
    if (!emailData) {
        errors.push('Object of mailMessage cannot be null');
        return errors;
    }
    else if (!emailData.email) {
        errors.push('Sender email is required');
        return errors;
    }
    else if (!emailData.mensagem) {
        errors.push('Message is required');
        return errors;
    }
    return errors;
}