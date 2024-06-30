import { NextResponse } from "next/server";

export async function GET(request:NextResponse){
    try {
        let response = NextResponse.json({
            message:"User Logout successfully",
            success:true,
            status:200
        })
        response.cookies.set("token","",{httpOnly:true,expires: new Date(0)});
        return response;
    } catch (error) {
        return NextResponse.json({message:"Error To logout User",
            status:404,
            success:false
        })
    }
}