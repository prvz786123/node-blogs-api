const router = require('express').Router();
const blogs = require('../models/blogs');
const ObjectID = require("mongodb").ObjectID
const validateMiddle = require("../middleware/validate")


//This route will return all blogs
router.get("/",async(req,res)=>{
    blogs.getBlogs().then(allBlogs=>{
        res.send({success:true, blogs:allBlogs})
    }).catch(err=>{
        res.send({success:false,err:"Unable to get data"})
    })
})

//This route will add new blog post
//Middleware will will validate for empty data and duplicate title
router.post("/add", validateMiddle.validateNewBlog,async(req,res)=>{
    let newBlog = {title:req.body.title,body:req.body.body}
    blogs.addBlog(newBlog)
    .then(success=>{
        if(success) {
            res.send({success:true, message:"Blogs Added Successfully"})
        } else {
            res.send({success:false, err:"Unable to add Post"})
        }
    })
    .catch(err=>{
        res.send({success:false, err:err})
    })
})

router.get("/categories",(req,res)=>{
    let categories = ["Fashion","Travels & Tourism","Health","Entertainment",,"Technology","Automobile"]
    res.status(200).send({success:true,categories})
})

//This is route will delete the post with help of object id
router.delete("/delete",(req,res)=>{
    // check if requested id is valid
    if(!ObjectID.isValid(req.body.id) ){
        // If Id is invalid return status code 422(unprocessable input)
        return res.status(422).send({success:false, message:"Object ID Invalid"})
    }
    // If id is valid pass it to the blogs model to process delete request
    blogs.deleteBlog(req.body.id).then(data=>{
        console.log(data)
        res.send({success:true, message:"deleted"})
    }).catch(err=>{
        console.log(err);
        res.send({success:false, message:err})
    })
})



module.exports=router;
