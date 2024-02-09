import DiscordProvider from "next-auth/providers/discord"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/app/models/Users";
import { dbConnect } from "../../../../../db";

export const options = {
    pages: {
        signIn: '/login',
        error: '/'
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Sign-in',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials, req) {
                try {
                    await dbConnect();
                    const userRes = await User.findOne({
                        username: credentials?.username,
                        password: credentials?.password
                    })
                    console.log(userRes);
                    // If no error and we have user data, return it
                    if (userRes) {
                        return {
                            id: userRes._id,
                            name: userRes.username
                        }
                    }
                } catch (e) {
                    // Return null if user data could not be retrieved
                    console.log(e)
                }
                return null
            }
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
            authorization: { params: { scope: 'identify' } },
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.username,
                }
            }
        })
    ]
}