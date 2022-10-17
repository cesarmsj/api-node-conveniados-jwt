const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('../middleware/validate-request');
const authorize = require('../middleware/authorize')
const usuarioService = require('../services/usuarios.service');
const conveniadoService = require('../services/conveniados.service');
const { response } = require('../app');

router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);

module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        Username: Joi.string().required(),
        UserPassword: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    usuarioService.authenticate(req.body)
        .then(
            response => {
                if (response.status === 401) {
                    return res.status(401).json({ status: 401, message: 'Credenciais inválidas', })
                } 
                res.json(response)
            }
        )
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        Username: Joi.string().required(),
        UserPassword: Joi.string().min(6).required(),
        Role: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    usuarioService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}
