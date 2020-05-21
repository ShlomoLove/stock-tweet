const express = require('express');
const path = require('path');
const cors = require('cors')();
const parser = require('body-parser');
const router = require ('./router.js');
const dotenv = require('dotenv').config()

const port = process.env.PORT || 80;
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(cors);

app.use(express.static(path.join(__dirname, '../dist')));
app.use('/tweets/', router)
app.use('/trending/', router)

app.listen(port, () => console.log(`connected to port ${port}!`))