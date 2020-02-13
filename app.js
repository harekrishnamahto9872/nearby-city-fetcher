const express = require('express')
const appController = require('./controllers/appController')

const app = express()

const port = process.env.PORT || 3000;

appController(app)
    

app.listen(port,()=>{
    console.log(`Listening to server at ${port}`);
})
    



