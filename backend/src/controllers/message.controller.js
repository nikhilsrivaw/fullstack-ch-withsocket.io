import Message from "../models/message.model.js";

export const getUserForSidebar = async(req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in getUserForsidebar:" , error.message);
        res.status(500).json({error:"Internal server error"});
        
    }
}
export const  getMessages = async (req,res)=>{
    try {
        const {id:userToChatId} = req.params
        const senderId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:senderId , recieverId:userToChatId},
                {senderId:userToChatId , recieverId : senderId}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMEssages controller :" , error.message);
        res.status(500).json({error:"internal server error"})
        
    }

}

export const sendMessage = async (req,res)=>{
    try {
        const {text , image} = req.body;
        const {id: recieverId  } = req.params;
        const senderId = req.user._id;
        
        let imageUrl;
        if(image){
            // upload base64 image to cloudinary

            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl= uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image:imageUrl,
        })
        await newMessage.save();

        // todo : realtime functionality goes here => socket.io 

        res.status(201).json(newMessage)
    } catch (error) {
        console.log('Error in sendMesage controller : ' , error.message)
        
    }
}