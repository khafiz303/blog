const express = require('express')
const router = express.Router()
const WriteDataIt = require('./seed')
const {getAllIt} = require('./controller')


router.get('/api/it' , getAllIt)

WriteDataIt()

module.exports = router

