const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const appRoute = require('./src/routes/routes-articles');
app.use('/', appRoute);

// var port = process.env.PORT
var port = 8080

app.listen(port, () => console.log(`App running on port : ${port}`));