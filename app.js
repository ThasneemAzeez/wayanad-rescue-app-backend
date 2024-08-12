const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const loginModel = require("./models/admin")
const { JsonWebTokenError } = require("jsonwebtoken")
const peopleModel = require("./models/people")
const app =express()
app.use(cors())
app.use(express.json())


app.get("/test",(req,res)=>{
    res.json({"status":"success"})
})
mongoose.connect("mongodb+srv://thasneemazeez:thasneem38@cluster0.uk9okno.mongodb.net/wayanadrescue?retryWrites=true&w=majority&appName=Cluster0")
app.post("/adminSignup",(req,res)=>{
    let input=req.body
    //this code is to check it is working
    // if (input.username == "admin" && input.password =="1234") {
    //     res.json({"status":"success"})
    // } else {
    //     res.json({"status":"ivalid credantials"})
    // } 
    let hashedpassword=bcrypt.hashSync(input.password,10)
    //console.log(hashedpassword) => checking whether the password is hashed or not
    let result = new loginModel(input)//passing input into loginMode
    result.save()
    res.json({"status":"success"})


    
})

app.post("/adminSignin",(req,res)=>{
    let input = req.body
    let result = loginModel.find({username:input.username}).then(
        (response)=>{
            if (response.length>0) {
                const validator=bcrypt.compareSync(input.password,response[0].password)
                if (validator) {
                    jwt.sign({email:input.username},"rescue-app",{expiresIn:"1d"},
                        (error,token)=>{
                            if (error) {
                                res.json({"status":"Token Credentials fails"})
                            } else {
                                res.json({"status":"success","token":token})
                            }
                        }
                    )
                    
                } else {
                    res.json({"status":"wrong password"})
                }
            } else {
                res.json({"status":"username doesnot exist"})
            }
        }
    ).catch()
})

app.post("/add",(req,res)=>{
    let input=req.body
    let user = new peopleModel(input)
    user.save()
    res.json({"status":"success"})
})

app.get("/view",(req,res)=>{
    peopleModel.find().then(
        (data)=>{
            res.json(data)
        }
    ).catch((error)=>{
        res.json(error)

    })
})

app.listen(3030,()=>{
    console.log("server started")
})