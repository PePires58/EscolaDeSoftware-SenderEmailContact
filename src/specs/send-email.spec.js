const assert = require('assert').strict;
const service = require('../services/send-email.service');

describe('Send-email service unit testing', function () {

    it('Should send e-mail with success', function () {

        let errors = service.SendEmail({
            Email: '123@gmail.com',
            Mensagem: 'Minha Mensagem'
        })

        assert.strictEqual(errors.length, 0);
    })
})