const mongoose=require('mongoose')
const Schema=mongoose.Schema

const InfoSchema=new Schema({
    username:{type:String,require:true},
    weight:{type:Number,require:true},
    date:{type:Date,require:true},
},
{
    timestamps:true,
}
);
const Info=mongoose.model('Info',InfoSchema);
module.exports=Info;
