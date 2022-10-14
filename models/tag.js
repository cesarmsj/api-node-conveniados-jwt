const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        IdTag: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        Nome: { type: DataTypes.STRING, allowNull: false },
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

    return sequelize.define('Tags', attributes, options);
}
