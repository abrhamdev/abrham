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
      console.log(error);
      return res.status(400).json({message:'Not Sent'});
    }
}