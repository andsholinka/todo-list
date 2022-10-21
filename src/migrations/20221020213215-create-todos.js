'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Todos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            activity_group_id: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Activities',
                    key: 'id'
                },
                allowNull: false
            },
            title: {
                type: Sequelize.STRING(100),
            },
            is_active: {
                type: Sequelize.INTEGER,
            },
            priority: {
                type: Sequelize.STRING(50),
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
        return queryInterface.dropTable('Todos');
    }
};