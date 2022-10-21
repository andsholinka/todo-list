'use strict';
module.exports = (sequelize, DataTypes) => {
    const Todos = sequelize.define("Todos", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        activity_group_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(100),
        },
        is_active: {
            type: DataTypes.INTEGER,
        },
        priority: {
            type: DataTypes.STRING(50),
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            // defaultValue: sequelize.literal('NOW()')
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            // defaultValue: sequelize.literal('NOW()')
        },
        deletedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE
    }, {
        sequelize,
        paranoid: true,
        tableName: 'Todos',
        timestamps: true
    });
    Todos.associate = function (models) {
        Todos.belongsTo(models.Activities, {
            as: 'activities',
            foreignKey: 'activity_group_id'
        })
    };
    return Todos;
};