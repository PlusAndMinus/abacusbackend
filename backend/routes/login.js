const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Register = require('../utils/models/register')
const private_key = process.env.PRIVATE_KEY || ''

const router = express.Router()

router.post('/login', (req, res) => {
    Register.findOne({email: req.body.email}, (err, result) => {
        if(err) {
            res.status(400).json({
                status: 'failed!',
                message: err
            })
        } if (result != undefined) {
            if (bcrypt.compareSync(req.body.password, result.password)) {
                const token = jwt.sign({id: result._id}, private_key, {expiresIn: '1h'})
                res.status(201).json({
                    status: 'success',
                    message: 'Logged in!',
                    token: token,
                    expiresIn: 3600
                })
            } else {
                res.status(400).json({
                    status: 'failed!',
                    message: err
                })
            }
        } else {
            res.status(400).json({
                status: 'failed!',
                message: err
            })
        }
    })
})

module.exports = router;