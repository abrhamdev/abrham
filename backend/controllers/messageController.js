import Message from "../models/messege.js";

export const sendMessage=async(req,res)=>{
     try {
    const { name,email,message } = req.body;

    const newMessage = new Message({
      name,
      email,
      message,
    });
    

    await newMessage.save();
    return res.status(201).json({ message: 'Message Sent' });
    }catch(error){
      return res.status(400).json({message:'Not Sent'});
    }
}

export const fetchMessages=async(req,res)=>{
   try {
         const messages = await Message.find().sort({ createdAt: -1 }); 
         return res.status(200).json(messages);
     } catch (error) {
       return res.status(500).json({ message: 'Failed to fetch projects' });
     }
}