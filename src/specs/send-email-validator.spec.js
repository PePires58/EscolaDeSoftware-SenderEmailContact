const assert = require('assert').strict;
const service = require('../services/send-email-validator');

describe('Send-email validator unit testing', function () {
    it('Should return a message of "Object of mailMessage cannot be null"', function () {
        let errors = service.ValidateObject(null);

        assert.notEqual(errors, null);
        assert.notEqual(errors.findIndex(error => error === 'Object of mailMessage cannot be null')
            , -1);
    });

    it('Should return a message of "Sender email is required"', function () {
        let errors = service.ValidateObject({});

        assert.notEqual(errors, null);
        assert.notEqual(errors.findIndex(error => error === 'Sender email is required')
            , -1);
    })

    it('Should return a message of "Message is required"', function () {
        let errors = service.ValidateObject({
            email: 'email@gmail.com'
        });

        assert.notEqual(errors, null);
        assert.notEqual(errors.findIndex(error => error === 'Message is required')
            , -1);
    });

    it('Should return no errors', function () {
        let errors = service.ValidateObject({
            email: 'email@gmail.com',
            mensagem: 'hello'
        });

        assert.strictEqual(errors.length, 0);
    })
});