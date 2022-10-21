'use strict';
module.exports = (sequelize, DataTypes) => {
    const Activities = sequelize.define("Activities", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(50),
        },
        title: {
            type: DataTypes.STRING(100),
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
        deletedAt: DataTypes.DATE
    }, {
        sequelize,
        paranoid: true,
        tableName: 'Activities',
        timestamps: true
    });

    Activities.associate = function (models) {
        Activities.hasMany(models.Todos, {
            foreignKey: 'activity_group_id'
        })
    };
    return Activities;
};