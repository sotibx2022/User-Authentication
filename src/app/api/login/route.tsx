import { User } from "@/model/user.models";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connectToDb } from "@/db/connection";
import jwt from 'jsonwebtoken';
export async function GET(request: Request) {
    await connectToDb(); // Connect to the database

    try {
        const users = await User.find();
        return NextResponse.json({ users });
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch users", error }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await connectToDb(); // Connect to the database
let response;
    try {
        const { email, password } = await request.json();
        const user = await User.findOne({ email });
        if (user) {
            const validPassword = await bcryptjs.compare(password, user.password);
            if (validPassword) {
                const tokenData = {
                    id:user._id,
                    email:user.email,
                    userName:user.userName
                }
                const token =  jwt.sign(tokenData,"user-Authentication",{expiresIn:"1h"})
                response =  NextResponse.json({message:"Login Details Verified", success:true, status:400});
                response.cookies.set("token",token,{httpOnly:true,path:"/"})
            } else {
                response =  NextResponse.json({ message: "Password does not match" ,  status: 401,success:false });
            }
        } else {
            response=  NextResponse.json({ message: "There is no registered user" ,  status: 404 ,success:false});
        }
    } catch (error) {
        response =  NextResponse.json({ message: "An error occurred", error , status: 500,success:false });
    }
    return response;
}
