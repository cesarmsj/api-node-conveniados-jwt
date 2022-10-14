const express = require('express');
const router = express.Router();

const authorize = require('../middleware/authorize')
const conveniadoService = require('../services/conveniados.service');

router.get('/', getAll);
router.get('/:id', authorize(), getById);

module.exports = router;

function getAll(req, res, next) {
    conveniadoService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    conveniadoService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}