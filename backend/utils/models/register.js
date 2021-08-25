const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Salt_Round = process.env.SALT_ROUND || ''

const registerSchema = new mongoose.Schema({
    firstName: {type: String, required: true, trim: true},
    lastName: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    password: {type: String, required: true}
})


registerSchema.pre('save', function(next) {
    const register = this;
    if(register.isModified('password')) {
        const saltRound = parseInt(Salt_Round)
        bcrypt.genSalt(saltRound, (err, salt) => {
            bcrypt.hash(register.password, salt, (err, hash) => {
                if(err) {
                    throw err
                } else {
                    register.password = hash
                    next()
                }
            })
        })
    } else {
        next()
    }
});

const Register = mongoose.model('Register', registerSchema)
module.exports = Register;