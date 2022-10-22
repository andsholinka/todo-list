const { todos } = require("../models");

require('dotenv').config();

const createTodoItems = async (req, res) => {
    try {
        const data = await todos.create({
            title: req.body.title,
            activity_group_id: req.body.activity_group_id,
            is_active: true,
            priority: "very-high",
            createdAt: Date.now(),
            updatedAt: Date.now(),
        })

        res.status(201).send({
            status: "Success",
            message: "Success",
            data
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: res.statusCode,
            message: e.message
        });
    }
}

const getAllTodoItems = async (req, res) => {

    try {
        const data = []

        if (req.query.activity_group_id) {
            const todoItems = await todos.findAll({
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
            const todoItems = await todos.findAll()

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
        const data = await todos.findOne({
            where: {
                id: req.params.id
            }
        })
        
        if (data == null) {
            res.status(404).send({
                status: 'Not Found',
                message: `Todo with ID ${req.params.id} Not Found`,
                data: {}
            })
            return
        }

        res.status(200).send({
            status: 'Success',
            message: 'Success',
            data
        })
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
            const data = await todos.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (data == null) {
                res.status(404).send({
                    status: 'Not Found',
                    message: `Todo with ID ${req.params.id} Not Found`,
                    data
                })
                return
            }

            await data.update({
                is_active: req.body.is_active,
                priority: req.body.priority,
                title: req.body.title,
                updatedAt: Date.now(),
            });

            res.status(200).send({
                status: 'Success',
                message: 'Success',
                data
            })

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
            const data = await todos.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (data == null) {
                res.status(404).send({
                    status: 'Not Found',
                    message: `Todo with ID ${req.params.id} Not Found`,
                    data
                })
                return
            }

            await todos.destroy({
                where: {
                    id: req.params.id,
                }
            })
            res.status(200).json({
                status: 'Success',
                message: 'Success',
                data: {}
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