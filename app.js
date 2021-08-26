const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors({origin:['http://localhost:3000']}))

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.DB_CONNECTION).then(()=>{
    console.log("Connected to mongodb Atlas")
    app.listen(PORT, ()=>console.log(`Server listening on port ${PORT}.`))
})