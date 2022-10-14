const db = require('../config/database');

module.exports = {
    getAll,
    getById
};

async function getAll() {
    return await db.Conveniados.findAll();
}

async function getById(id) {
    return await getConveniado(id);
}

async function getConveniado(id) {
    const conveniado = await db.Conveniados.findByPk(id);
    if (!conveniado) throw 'Conveniado não encontrado';
    return conveniado;
}