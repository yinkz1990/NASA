const express = require('express');
const launchRouter =  express.Router();
const {httpGetAllLaunch, httpAddNewLaunch, httpAbortLaunch} = require('./launches.controller');


launchRouter.get('/', httpGetAllLaunch);
launchRouter.post('/', httpAddNewLaunch);
launchRouter.delete('/:id', httpAbortLaunch);





module.exports = launchRouter;