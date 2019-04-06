const db_connection = require('../factories/db_connection')
const config = require("./secret")

module.exports.registerNewUser = async (newUser)=>{
    const con = await db_connection.connectDB();
    const userCol = con.collection("users");

    return new Promise((resolve,reject)=>{
        userCol.insertOne(newUser).then((data)=>{
            if(data){
                resolve(true);
            } else {
                reject(false);
            }
        })
    })
}

module.exports.getUsers= async ()=>{
    const con =await db_connection.connectDB();
    const userCol = con.collection('users');

    return new Promise((resolve,reject)=>{
        userCol.find().toArray((err,users)=>{
            if(err){
                reject(err)
            } else{
                resolve(users)
            }
        })
    })
}