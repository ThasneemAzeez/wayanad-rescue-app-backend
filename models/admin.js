const mongoose=require("mongoose")
const scheema = mongoose.Schema(
    {
        "username":{type:String,required:true},
        "password":{type:String,required:true}
    }
)
let loginModel = mongoose.model("admin",scheema);
module.exports=loginModel