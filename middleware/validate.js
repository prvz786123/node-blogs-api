const blogs_model = require("../models/blogs")

let validateNewBlog = (req,res,next)=>{
    //Check if title and body data are valid and not null
    if(
        req.body.title==="" || req.body.title===undefined ||req.body.title===null ||
        req.body.body==="" || req.body.body===undefined ||req.body.body===null
        ){
        return res.status(422).send({success:true, message:"Invalid Blog Data"})
    }else {
        //Check if Same title name alrady exist in the database
        blogs_model.findBlogByTitle(req.body.title).then(data=>{
            if(data.length>0){
                return res.send({success:true,message:"Title Already Exist"})
            }else{
                next();
            }
        }).catch(err=>{
            console.log(err);
            res.send(err);
        })
    }
}

module.exports ={
    validateNewBlog
}