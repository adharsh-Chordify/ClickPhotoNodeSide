
const express =require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const {sequelize}=require('./models/index')




const app=express()
const port=4001

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',require('./router/router'))
app.use('/uploads',express.static('uploads'))




app.listen(port,async()=>{
    console.log("server is running")
    await sequelize.authenticate()
    console.log("The database is connected");
})