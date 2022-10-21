"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class todos extends Model {
        // static associate(models) {
        //   // define association here
        // }
    }
    todos.init(
        {
        activity_group_id: DataTypes.NUMBER,
        title: DataTypes.STRING,
        is_active: DataTypes.STRING,
        priority: DataTypes.STRING,
        },
        {
        sequelize,
        modelName: "todos",
        underscored: true,
        paranoid: true,
        }
    );
    return todos;
};
