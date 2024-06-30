import { connectToDb } from "@/db/connection";
import { getTokenDetails } from "@/helper/getDetailsFromToken";
import { User } from "@/model/user.models";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    connectToDb(); // Assuming this function connects to the database

    try {
        const tokenData = await getTokenDetails(request);
        const decodedToken = tokenData as JwtPayload;

        if (!decodedToken || !decodedToken.id) {
            throw new Error("Problem finding user ID from token");
        }

        const userID = decodedToken.id;

        // Assuming User.findOne returns a Promise
        const user = await User.findOne({ _id: userID }).select("-password -isAdmin -userVerificationToken -userVerificationTokenExpiry -forgetPasswordToken -forgetPasswordTokenExpiry");

        if (!user) {
            throw new Error("User not found");
        }

        return NextResponse.json({ name: "token", user });
    } catch (error: any) {
        console.error("Error in GET request:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
