const mongoose= require('mongoose')

const storySchema = new mongoose.Schema({
    title:String,
    content:String,
    image:String,
    language:String,
})

module.exports=mongoose.model("Story",storySchema)