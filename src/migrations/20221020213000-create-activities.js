'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Activities', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                type: Sequelize.STRING(50),
            },
            title: {
                type: Sequelize.STRING(100),
            },
            createdAt: {
                type: Sequelize.DATE,
            },
            updatedAt: {
                type: Sequelize.DATE,
            },
            deletedAt: {
                type: Sequelize.DATE,
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Activities');
    }
};