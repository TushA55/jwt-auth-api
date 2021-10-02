const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv');
const pingCrtl = require('./controllers/ping')
dotenv.config();
const cors = require('cors')

// Import Routes
const apiRoutes = require('./routes/auth')

const app = express()

// middlewares
app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())

app.use('/api/users', apiRoutes)

app.get('/ping', pingCrtl)

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}`);
})
