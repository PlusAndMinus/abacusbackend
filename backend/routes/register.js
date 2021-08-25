const express = require('express')
const Register = require('../utils/models/register')
const validateUser = require('../middleware/auth')
const bcrypt = require('bcryptjs') 

const router = express.Router()

const Salt_Round = process.env.SALT_ROUND || ''

router.get('/register', (req, res) => {
    Register.find({}, (err, result) => {
        if(err) {
            res.status(400).json({
                status: 'failed!',
                message: 'User not found'
            })
        } else {
            res.status(201).json({
                status: 'Success',
                data: result
            })
        }
    })
})

router.get('/register/:id', (req, res) => {
    const id = req.params.id
    Register.findById({'_id': id}, (err, result) => {
        if(err) {
            res.status(400).json({
                status: 'failed!',
                message: err
            })
        } else {
            res.status(201).json({
                status: 'Success',
                message: 'User found',
                data: result
            })
        }
    })
})

router.put('/update', validateUser, async (req, res) => {
    let hashedPassword = ''
    const id = req.body._id
    const saltRound = parseInt(Salt_Round)
    await bcrypt.genSalt(saltRound, async (err, salt) => {
        await bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) {
                throw err
            } else {
                hashedPassword = hash
                Register.findOneAndUpdate(id, {$set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hashedPassword
                }}, {new: true}, (err, result) => {
                    if(err) {
                        res.status(400).json({
                            status: 'failed!',
                            message: err
                        })
                    } else {
                        res.status(201).json({
                            status: 'Sucess!',
                            message: 'Updated',
                            data: result
                        })
                    }
                })
            }
        })
    })    
})

router.post('/register', (req, res) => {
    const register = new Register({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    })
    register.save()
        .then((registeredUser) => {
            res.status(201).json({
                message: 'Registered!',
                data: registeredUser
            })
        })
})


module.exports = router