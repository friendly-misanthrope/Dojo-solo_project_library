require("./config/mongoose.config")

const express = require('express')
const app = express()
const cors = require('cors')
const AllBookRoutes = require('./routes/book.routes')
const bodyParser = require('body-parser')

app.use(cors(), 
bodyParser.json({limit: '100mb'}),
bodyParser.urlencoded({extended: true, limit: '100mb'}),
express.json(),
express.urlencoded({extended: true})
)

AllBookRoutes(app)

app.listen(8000, () => console.log("Server is listening on port 8000"))