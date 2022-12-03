const express = require("express");
const basePath = require("../middleware/base-path");
const router = express.Router();
const emailService = require("../services/send-email.service");
const emailServiceValidator = require("../services/send-email-validator");

router.post('/', basePath, async (req, res) => {
    try {
        const body = req.body;
        let errors = emailServiceValidator.ValidateObject(body);

        if (errors.length > 0) {
            res.status(400).json({
                errors: errors
            });
            return;
        }

        await emailService.SendEmail(body)
            .then(() => {
                res.status(200);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    errors: 'erro ao enviar e-mail'
                });
            });
    }
    catch (errors) {
        res.status(500).json({
            errors: errors
        });
    }
});

module.exports = router;