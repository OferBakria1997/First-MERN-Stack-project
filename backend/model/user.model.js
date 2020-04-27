const mongoose=require('mongoose')
const Schema=mongoose.Schema

const UserSchema=new Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        trim:true,// no spaces after the username
        minlength:3
    }},
    {
        timestamps:true,
    });
const User=mongoose.model('User',UserSchema);
module.exports=User;
