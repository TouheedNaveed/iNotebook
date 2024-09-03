const mongoose =require('mongoose');
const {Schema}=mongoose;
const contactSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    msg:{
        type:String,
        default:"",
    },
    date:{
        type:Date,
        default:Date.now
    },
});

module.exports =mongoose.model('contact',contactSchema);