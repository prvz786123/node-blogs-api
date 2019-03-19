const db_con = require("../factories/db_connection")
const ObjectId = require('mongodb').ObjectID;

//This method will add new blog to the blogs collections
module.exports.addBlog = async (blog)=>{
    //connect to database
    const db =await db_con.connectDB();
    const blogs_col =  db.collection("blogs");

    return new Promise((resolve,reject)=>{
        blogs_col.insertOne(blog).then((data)=>{
            if(data){
                resolve(true)
            } else{
                reject(false)
            }
        })
    })
}

//This method will fetch all the blogs from database
module.exports.getBlogs = async ()=>{
    const db = await db_con.connectDB(); 
    const blogs_col = db.collection("blogs");
    return new Promise((resolve,reject)=>{  
        blogs_col.find().toArray((err,blogs)=>{
            if(!err){
                resolve(blogs)
            } else{
                reject("Error")
            }
        })
    })
}

//This method will find blog post for given id and delete it;
module.exports.deleteBlog = async (OId)=>{
    //connect to database;
    const db = await db_con.connectDB();
    
    //blogs collections
    const blogs_col = db.collection("blogs");

    return new Promise((resolve,reject)=>{
        //MongoDB Method to delete
        blogs_col.findOneAndDelete({"_id":ObjectId(OId)}).then(data=>{
            if(data.value) {
                resolve(data)
            } else {
                reject("Post Does Not Exist")
            }
        }).catch(err=>{
            reject(err)
        })
    })
}

//This Method will search for given title result as promise
module.exports.findBlogByTitle = async (title)=>{
    const db =await db_con.connectDB();
    const blogs_col = db.collection("blogs");

    return new Promise((resolve,reject)=>{
        blogs_col.find({"title":title}).toArray().then(data=>{
            resolve(data);
        }).catch(err=>{
            reject(err);
        })
    })
}
