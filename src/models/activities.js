"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class activities extends Model {
        // static associate(models) {
        //   // define association here
        // }
    }
    activities.init(
        {
        email: DataTypes.STRING,
        title: DataTypes.STRING,
        },
        {
        sequelize,
        modelName: "activities",
        paranoid: true,
        }
    );
    return activities;
};
