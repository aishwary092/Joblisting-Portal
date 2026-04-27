import { Webhook } from "svix";
import User from "../models/User.js";
import { json } from "express";

//API Controller Function to Manage Clerk User with database
export const clerkwebhooks = async (req,res) => {
    try{

        // Create a Svix instance with clerk webhook secret.
        const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET)

        //Veryfing Headers
        await whook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        // Getting data from request body
        const {data,type} = req.body
        console.log('Webhook received:', type, data.id)

        // Switch case or different Events
        switch(type){
            case 'user.created':{

                const userData = {
                    _id:data.id,
                    email:data.email_addresses[0].email_address,
                    name:data.first_name + " " + data.last_name,
                    image:data.image_url,
                    resume: ""
                }
                await User.create(userData)
                console.log('User created:', data.id)
                res.json({})
                break;
            }
            case 'user.updated':{
                const userData = {
                    email:data.email_addresses[0].email_address,
                    name:data.first_name + " " + data.last_name,
                    image:data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData)
                console.log('User updated:', data.id)
                res.json({})
                break;
            }
            case 'user.deleted':{
                await User.findByIdAndDelete(data.id)
                console.log('User deleted:', data.id)
                res.json({})
                break;
            }
            default:
                console.log('Unhandled event type:', type)
                break;
        }

    } catch (error) {
        console.log('Webhook error:', error.message);
        res.json({success:false,message:'webhooks Error'})
    }
}