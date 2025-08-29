import express from "express"
import { Contact } from "../models/Contact.js"

const router=express.Router()

router.post('/',async (req,res)=>{
    try{
        const {name,email,phone,message}=req.body
        if(!name||!email||!message){
            return res.status(400).json({ status: false, message: "Name, Email, and Message are required" })

        }
        const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });
    await newContact.save()
    return res.status(201).json({ status: true, message: "Message received successfully!" });

    }catch(err){
        res.status(500).json({status:false,message:"Server Error"})
    }
})
export {router as contactRouter}
