const express = require ('express');
const router = require ('express').Router();
const { getFeed } = require ('./controller.js');

router
.route('/:symbol')
.get( getFeed )

module.exports = router;