const express = require("express");
const bodyParser = require('body-parser');
const blogs_route = require('./routes/blogs_route')

const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

app.use("/blogs",blogs_route)

app.listen(8000)