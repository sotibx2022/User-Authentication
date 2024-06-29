import { connectToDb } from "@/db/connection";
import {User} from "@/model/user.models";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function GET() {
    try {
      // Connect to the database
      await connectToDb();
      
      // Fetch all users from the database
      const users = await User.find();
      
      // Return the list of users as a JSON response
      return NextResponse.json({ name:"binaya" , users});
    } catch (error) {
      console.error("Error fetching users:", error);
      return NextResponse.json({message:error, status: 500 });
    }
  }
export async function POST(request:NextResponse) {
    // Connect to the database
    await connectToDb();
  
    try {
      // Parse the request body
      const { userName, email, password } = await request.json();
      let user = await User.find({email});
      if(user.length>0){
        return NextResponse.json({message:"Provided Email already exist on Database"})
      }else{
       let salt = await bcryptjs.genSalt(10);
       const hashPassword = await bcryptjs.hash(password,salt);
        let newUser = new User({
            userName: userName,
            email: email,
            password: hashPassword,
          });
      
          // Save the new user to the database
          let savedUser = await newUser.save();
      
          // Return the saved user as a JSON response
          return NextResponse.json({message:"UserDetails Posted Successfully", status:200, success:true,savedUser});
      }
     
     
  
    } catch (error) {
      
      return NextResponse.json({message:"Failed to post Data",status:500,success:false });
    }
  }