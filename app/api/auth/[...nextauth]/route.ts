import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { dbConnect } from "@/lib/mongodb";
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import { compare } from 'bcryptjs';

const authOptions : AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                
                const { email, password } = credentials;
                
                console.log("Email: ", email);
                console.log("Password: ", password);
                try {
                    await dbConnect();
                    const user = await User.findOne({email});
                    console.log("user: ", user);
                    if(!user){
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    console.log("match user: ", passwordMatch);
                    if(!passwordMatch){
                        return null;
                    }
                    console.log("return user: ", user);
                    return user;
                } catch (error) {
                    console.log("Error: ", error);
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    }
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};