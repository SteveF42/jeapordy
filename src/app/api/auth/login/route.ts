import User from "@/app/models/Users";
import { dbConnect } from "../../../../../db";


export async function POST(req: Request) {
    const con = await dbConnect();
    
    const userInfo = await req.json();
    const userRes = await User.findOne({
        username: userInfo.username,
        password: userInfo.password
    })
    if (userRes) {
        return Response.json({
            username: userRes.username,
            password: userRes.password
        });
    }

    return null;
}