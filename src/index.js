require("dotenv").config();
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const routes = require('./routes')

const app = express()

app.use(cookieParser())

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(process.env.PORT || 3333)