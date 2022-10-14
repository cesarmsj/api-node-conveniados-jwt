const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        IdDesconto: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        Valor: { type: DataTypes.INTEGER, allowNull: false },
        Descricao: { type: DataTypes.STRING, allowNull: false },
    };

    const options = {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        defaultScope: {
        },
        scopes: {
        }
    };

    return sequelize.define('Descontos', attributes, options);
}
