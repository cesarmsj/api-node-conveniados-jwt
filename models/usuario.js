const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        IdUser: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        Username: { type: DataTypes.STRING, allowNull: false },
        UserPassword: { type: DataTypes.STRING, allowNull: false },
        Role: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['Userpassword'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        },
    };

    return sequelize.define('Usuarios', attributes, options);
}

