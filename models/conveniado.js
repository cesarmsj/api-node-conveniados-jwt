const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        IdConveniado: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        Nome: { type: DataTypes.STRING, allowNull: false },
        Endereco: { type: DataTypes.STRING, allowNull: false },
        Telefone: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    };

    return sequelize.define('Conveniados', attributes, options);
}