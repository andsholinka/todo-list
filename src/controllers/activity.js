const { activities } = require("../models");

require('dotenv').config();

const {
    sequelize
} = require('../models/index');

const createActivity = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {

            if (!req.body.title) {
                res.status(400).send({
                    status: 'Bad Request',
                    message: 'title cannot be null',
                    data: {}
                })
                return
            }

            const data = await activities.create({
                email: req.body.email,
                title: req.body.title,
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
        res.status(500).send({
            status: res.statusCode,
            message: e.message
        });
    }
}

const getAllActivites = async (req, res) => {

    try {
        await sequelize.transaction(async (t) => {

            const data = []
            const actvities = await activities.findAll({
                // paranoid:false
            })

            for (var item of actvities) {
                data.push({
                    id: item.id,
                    email: item.email,
                    title: item.title,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    deletedAt: item.deletedAt,
                })
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

const getDetailActivity = async (req, res) => {

    try {
        await sequelize.transaction(async (t) => {

            const data = await activities.findOne({
                where: {
                    id: req.params.id
                }
            })
            
            if (data == null) {
                res.status(404).send({
                    status: 'Not Found',
                    message: `Activity with ID ${req.params.id} Not Found`,
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

const updateActivity = async (req, res) => {

    try {
        await sequelize.transaction(async (t) => {

            const activity = await activities.findOne({
                where: {
                    id: req.params.id
                },
                transaction: t
            })

            if (activity == null) {
                res.status(404).send({
                    status: 'Not Found',
                    message: `Activity with ID ${req.params.id} Not Found`,
                    data: activity
                })
                return
            }

            await activity.update({
                email: req.body.email,
                title: req.body.title,
                updatedAt: Date.now(),
            }, {
                transaction: t
            });

            res.status(200).send({
                status: 'Success',
                message: 'Success',
                data: activity
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

const deleteActivity = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {

            const activity = await activities.findOne({
                where: {
                    id: req.params.id
                },
                transaction: t
            })

            if (activity == null) {
                res.status(404).send({
                    status: 'Not Found',
                    message: `Activity with ID ${req.params.id} Not Found`,
                    data: activity
                })
                return
            }

            await activities.destroy({
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
        res.status(500).send({
            status: res.statusCode,
            message: e.message
        })
    }
}

module.exports = {
    createActivity,
    getAllActivites,
    getDetailActivity,
    updateActivity,
    deleteActivity,
}