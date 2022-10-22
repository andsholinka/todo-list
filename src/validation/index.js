const {
    body,
    validationResult,
    check
} = require('express-validator');

exports.runValidation = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "Bad Request",
            message: errors.array()[0].msg
        });
    }
    next()
}

exports.createActivity = [
    check('title', 'title cannot be null').notEmpty()
]

exports.createTodo = [
    check('title', 'title cannot be null').notEmpty(),
    check('activity_group_id', 'activity_group_id cannot be null').notEmpty()
]