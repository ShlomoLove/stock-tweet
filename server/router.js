const express = require ('express');
const router = require ('express').Router();
const { getFeed, getTrending } = require ('./controller.js');

router
.route('/:symbol')
.get( getFeed )

router
.route('/')
.get( getTrending )

module.exports = router;