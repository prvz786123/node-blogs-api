const MongoClient = require('mongodb').MongoClient;


module.exports.connectDB = async ()=>{
    return new Promise((resolve,reject)=>{
        MongoClient.connect("mongodb://blogs_admin:blogsadmin123@ds121295.mlab.com:21295/db_blogs",{useNewUrlParser:true},(err,client)=>{
            if(!err){
                console.log("connection successfull")
                resolve(client.db());
            } else {
                console.log("Connection Problem")
                reject(err);
            }
        })
    })
}