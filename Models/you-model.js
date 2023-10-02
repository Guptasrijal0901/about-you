const mongoose = require ("mongoose")
const youSchema = new mongoose.Schema({
    name:
    {type: String,
    trim: true,
    required:true},
    email:
    {type: String,
    trim: true,
    required:true},
    date:
    {type: Date,
    trim: true,
    required:true},
    age:
    {type: Number,
    trim: true,
    required:true},
    intro:
    {type: String,
    trim: true,
    required:true},
    experience:
    {type: String,
    trim: true,
    required:true},
},
{timestamps: true})
const collection = mongoose.model("you-data", youSchema)
module.exports = collection 
