const db = require('../models/index');

require('dotenv').config();

const {
    sequelize
} = require('../models/index');

const Todos = db.Todos;

const createTodoItems = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {

            if (!req.body.title) throw new Error('gagal menambahkan todo-item, title wajib diisi');
            if (!req.body.activity_group_id) throw new Error('gagal menambahkan todo-item, activity group id wajib diisi');

            const data = await Todos.create({
                title: req.body.title,
                activity_group_id: req.body.activity_group_id,
                is_active: req.body.is_active,
                priority: req.body.priority,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            })

            res.status(201).send({
                status: "Success",
                message: "Success",
                data
            })
        });
    } catch (e) {
        console.log(e);
        res.status(400).send({
            status: res.statusCode,
            message: e.message
        });
    }
}

const getAllTodoItems = async (req, res) => {

    try {
        await sequelize.transaction(async (t) => {

            const data = []

            if (req.query.activity_group_id) {
                const todoItems = await Todos.findAll({
                    // paranoid:false
                    where: {
                        activity_group_id: req.query.activity_group_id
                    }
                })
    
                for (var item of todoItems) {
                    data.push({
                        id: item.id,
                        activity_group_id: item.activity_group_id,
                        title: item.title,
                        is_active: item.is_active,
                        priority: item.priority,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt,
                        deletedAt: item.deletedAt,
                    })
                }
            } else {
                const todoItems = await Todos.findAll()
    
                for (var item of todoItems) {
                    data.push({
                        id: item.id,
                        activity_group_id: item.activity_group_id,
                        title: item.title,
                        is_active: item.is_active,
                        priority: item.priority,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt,
                        deletedAt: item.deletedAt,
                    })
                }
            }

            res.status(200).send({
                status: 'Success',
                message: 'Success',
                data
            })
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: res.statusCode,
            message: e.message
        })
    }
}

const getDetailTodoItems = async (req, res) => {

    try {
        await sequelize.transaction(async (t) => {

            const data = await Todos.findOne({
                where: {
                    id: req.params.id
                }
            })
            
            if (data == null) {
                res.status(404).send({
                    status: 'Not Found',
                    message: `Todo-item with ID ${req.params.id} Not Found`,
                    data: {}
                })
                return
            }

            res.status(200).send({
                status: 'Success',
                message: 'Success',
                data
            })
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: res.statusCode,
            message: e.message
        })
    }
}

const updateTodoItems = async (req, res) => {

    try {
        await sequelize.transaction(async (t) => {

            const data = await Todos.findOne({
                where: {
                    id: req.params.id
                },
                transaction: t
            })

            if (data == null) {
                res.status(404).send({
                    status: 'Not Found',
                    message: `Todo-item with ID ${req.params.id} Not Found`,
                    data
                })
                return
            }

            await data.update({
                is_active: req.body.is_active,
                title: req.body.title,
                updatedAt: Date.now(),
            }, {
                transaction: t
            });

            res.status(200).send({
                status: 'Success',
                message: 'Success',
                data
            })
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: res.statusCode,
            message: e.message
        })
    }
}

const deleteTodoItems = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {

            const data = await Todos.findOne({
                where: {
                    id: req.params.id
                },
                transaction: t
            })

            if (data == null) {
                res.status(404).send({
                    status: 'Not Found',
                    message: `Todo-item with ID ${req.params.id} Not Found`,
                    data
                })
                return
            }

            await Todos.destroy({
                where: {
                    id: req.params.id,
                },
                transaction: t
            })
            res.status(200).json({
                status: 'Success',
                message: 'Success',
                data: {}
            });
        });
    } catch (e) {
        console.log(e);
        res.status(400).send({
            status: res.statusCode,
            message: e.message
        })
    }
}

module.exports = {
    createTodoItems,
    getAllTodoItems,
    getDetailTodoItems,
    updateTodoItems,
    deleteTodoItems,
}