const express = require('express')
const Enquire = require('../utils/models/enquire')
const validateUser = require('../middleware/auth')
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId
const router = express.Router()

router.post('/enquire', (req, res) => {
    const enquire = new Enquire({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        course: req.body.course
    })
    enquire.save()
        .then(enquiry => {
            res.status(201).json({
                status: 'Enquiry submitted!',
                data: enquiry
            })
        })
        .catch(err => {
            res.status(500).json({
                status: 'failed!',
                message: err
            })
        })
})

router.get('/enquire', validateUser, (req, res) => {
    Enquire.find({})
        .then(enquiries => {
            if(enquiries !== undefined) {
                res.status(200).json({
                    status: 'Enquiries found!',
                    data: enquiries
                })
            } else {
                res.status(400).json({
                    status: 'No enquiries found!',
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                status: 'failed!',
                message: err.message
            })
        })
})

router.get('/enquire/:id', validateUser, (req, res) => {
    const id = req.params.id
    Enquire.findById({'_id': id}, (err, result) => {
        if(err) {
            res.status(400).json({message: err.message})
        } else {
            res.status(200).json({data: result, message: 'Enquiry Found!'})
        }
    })
})

router.delete('/enquire/:id', validateUser, (req, res) => {
    const id = req.params.id
    Enquire.findByIdAndDelete({_id: id}, (err, result) => {
        if (err) {
            res.status(400).json({
                status: 'failed!',
                message: err.message
            })
        } else {
            res.status(201).json({
                message: 'Success!',
                id: result._id,
                data: result
            })
        }
    })
})


router.put('/enquire/:id', (req, res) => {
    const id = req.params.id
    Enquire.findByIdAndUpdate({_id: id}, { $set: {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        course: req.body.course
    }}, {new: true}, (err, result) => {
        if(err) {
            res.status(400).json({
                status: 'Failed!',
                message: err
            })
        } else {
            res.status(201).json({
                status: 'Success!',
                data: result
            })
        }
    })
})

module.exports = router