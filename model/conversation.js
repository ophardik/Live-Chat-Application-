const moongose=require("mongoose")
const conversationSchema=new moongose.Schema({
    participants:[
        {
            type:moongose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    messages:[
        {
            type:moongose.Schema.Types.ObjectId,
            ref:"Message",
            default:[],
        }
    ]
},{timestamps:true})

const Conversation=new moongose.model("Conversation",conversationSchema)
module.exports=Conversation