import User from "@/app/models/Users";
import { dbConnect } from "../../../../../db";

export async function POST(res: Response) {
    try {
        const db = await dbConnect();
        const data = await res.json();
        const entry = new User({
            username: data.username,
            password: data.password
        })
        const dup = await User.findOne({ username: data.username });
        if (dup) {
            return new Response('Duplicate found', {
                status: 409
            })
        }
        await entry.save();
        console.log("new account created")
        return new Response('created', {
            status: 201
        })
    } catch (e) {
        console.log('[ERROR] route.ts line 26')
        return new Response('error', {
            status: 418
        })
    }
}