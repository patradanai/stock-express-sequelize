import express,{ Application, Request, Response } from 'express'

// Init Dotenv
require('dotenv').config()

const PORT = process.env.PORT || 3000
const app:Application = express()

app.listen(PORT, ()=>{
    console.log(`Running Server on ${PORT}`)
})