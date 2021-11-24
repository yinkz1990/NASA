const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const planetRouter = require('./routes/planets/planets.router');
const launchRouter = require('./routes/launches/launches.router')

const app = express();


app.use(cors({
    origin: 'http://localhost:3000',
    origin: 'http://localhost:8000',
    origin: 'https://ancient-refuge-83380.herokuapp.com'
}))

app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", 'public')));

app.use('/planets', planetRouter);
app.use('/launches', launchRouter);

if(process.env.NODE_ENV === 'production'){

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    });
}
module.exports = app;