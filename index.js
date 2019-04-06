const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')

//Routes
const blogs_route = require('./routes/blogs_route')
const user_route = require('./routes/user_route')


const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

app.use(cors());

app.get("/",(req,res)=>{
    res.send("<h2>Welcome To Blog Service</h2>")
})

app.use('/user',user_route);
app.use("/blogs",blogs_route);



let port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log("Server Listening on "+port)
})