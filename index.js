const express = require("express");
const cors = require("cors");
const logger = require('morgan');
const path = require('path');

require('dotenv').config();
const PORT = process.env.PORT || 3030;

const apiRouter = require('./src/routers');

const app = express();
const router = express.Router();

app.use(cors())
app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({
    extended: true,
    parameterLimit: 100000,
    limit: '50mb'
}));

app.use('/images', express.static(path.join(__dirname, 'images')))

const db = require("./src/models");

app.get("/", (req, res) => {
    res.send({
        message: "Welcome to API TODO"
    });
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

router.use('/', apiRouter)

app.use('/', router);