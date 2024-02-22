
const express =require('express')
const http=require('http')
const cors=require('cors')
const bodyParser=require('body-parser')
const {sequelize}=require('./models/index')

const {Server} =require("socket.io")
const { log } = require('console')

const app=express()
const port=4001

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',require('./router/router'))
app.use('/uploads',express.static('uploads'))

const server= http.createServer(app)

//socket creation

const io=new Server(server,{
   cors:{
      origin:"*",
      methods:["GET","POST"]
   }
})

//socket connect

io.on('connection',(socket)=>{
    console.log("Connection is established");

    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`User with the id: ${socket.id}  joined the room ${data}`);
    })

    socket.on("send_message",(data)=>{
        
        socket.to(data.room).emit( "recieve_message", data)
        console.log(data);
    })

    socket.on('disconnect',()=>{
        console.log("Connection is disconnected");
    })
})

// io.on("connection",(socket)=>{
//     socket.on("message",(data)=>{
//         console.log("data from client :",data);
//         socket.send("thanks buddy")
//     })
// })

server.listen(port,async()=>{
    console.log("server is running")
    await sequelize.authenticate()
    console.log("The database is connected");
    
})