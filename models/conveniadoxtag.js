const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {

    const attributes = {
        
    };

    const options = {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    };

    return sequelize.define('ConveniadoXTags', attributes, options);
}

