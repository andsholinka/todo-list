const { activities } = require("../models");

const createActivity = async (req, res) => {
    try {
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
        const limit = req.query.limit ? req.query.limit : 5;
        const findAll = await activities.findAll({
            limit: limit,
        });
        return res.status(200).json({
            status: "Success",
            message: "Success",
            data: findAll,
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
            const activity = await activities.findOne({
                where: {
                    id: req.params.id
                }
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
            });

            res.status(200).send({
                status: 'Success',
                message: 'Success',
                data: activity
            })
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
            const activity = await activities.findOne({
                where: {
                    id: req.params.id
                }
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
                }
            })
            res.status(200).json({
                status: 'Success',
                message: 'Success',
                data: {}
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
    deleteActivity
}