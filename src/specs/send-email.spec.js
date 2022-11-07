const assert = require('assert').strict;
const service = require('../services/send-email.service');

describe('Send-email service unit testing', function () {

    it('Should not send e-mail because there are no credentials', function () {

        let errors = service.SendEmail({
            Email: '123@gmail.com',
            Mensagem: 'Minha Mensagem'
        })

        assert.notStrictEqual(errors.length, 0);
    })
})