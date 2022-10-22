const responseCode = require('./const/httpResponseCode')

class HttpError extends Error {
    constructor({ message, name, statusCode, data }) {
        super(message)
        this.name = name
        this.statusCode = statusCode
        this.data = data
        Error.captureStackTrace(this, HttpError)
    }
}

class HttpBadRequest extends HttpError {
    constructor(message = 'Bad request', data) {
        super({
        message,
        name: 'HttpBadRequest',
        statusCode: responseCode.BAD_REQUEST,
        data,
        })
    }
}

class HttpUnprocessableEntity extends HttpError {
    constructor(message = 'Unprocessable Entity', data) {
        super({
        message,
        name: 'HttpUnprocessableEntity',
        statusCode: responseCode.UNPROCESSABLE_ENTITY,
        data,
        })
    }
}

class HttpUnauthorized extends HttpError {
    constructor(message = 'Unauthorized', data) {
        super({
        message,
        name: 'HttpUnauthorized',
        statusCode: responseCode.UNAUTHORIZED,
        data,
        })
    }
}

class HttpForbidden extends HttpError {
    constructor(message = 'Forbidden', data) {
        super({
        message,
        data,
        statusCode: responseCode.FORBIDDEN,
        })
    }
}

class HttpNotFound extends HttpError {
    constructor(message = 'Not Found', data) {
        super({
        message,
        name: 'HttpNotFound',
        statusCode: responseCode.NOT_FOUND,
        data,
        })
    }
}

class HttpInternalServerError extends HttpError {
    constructor(message = 'Internal server error', data) {
        super({
        message,
        name: 'HttpInternalServerError',
        statusCode: responseCode.INTERNAL_SERVER_ERROR,
        data,
        })
    }
}

module.exports = {
    HttpError,
    HttpBadRequest,
    HttpUnprocessableEntity,
    HttpUnauthorized,
    HttpNotFound,
    HttpInternalServerError,
    HttpForbidden,
}