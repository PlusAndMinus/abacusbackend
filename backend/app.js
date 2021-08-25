const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const cors = require('cors')

dotenv.config()

const app = express()

const registerRoutes = require('./routes/register')
const loginRoutes = require('./routes/login')
const enquireRoutes = require('./routes/enquire')

// bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// cors middleware
app.use(cors())

// db config
const db = require('./utils/config/keys').MongoURI
mongoose.connect(db, ({useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}))
    .then(() => console.log('db connected'))
    .catch(err => console.log(err))

// routes
app.use('/user', registerRoutes)
app.use('/user', loginRoutes)
app.use('/', enquireRoutes)

const port = process.env.PORT || 3000

app.listen(3000, () => console.log(`Server running on ${port}`))