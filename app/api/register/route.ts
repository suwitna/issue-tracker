'use server';

import { dbConnect } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

dbConnect();
export async function POST(req: NextRequest) {

    try {
        const { gender, firstName, lastName, cardID, phoneNo, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Gender: ", gender);
        console.log("Name: ", firstName, " ", lastName);
        console.log("Card ID: ", cardID);
        console.log("Phone No: ", phoneNo);
        console.log("Email: ", email);
        console.log("Password: ", password);
        console.log("hashedPassword: ", hashedPassword);
        
            /*
        const user = await User.create(
            req.body,
        );
        */
        const checkUser = await User.findOne({email});
        if(checkUser){
            console.log("User: ", checkUser);
            return NextResponse.json({message: `${email}` + ' อีเมล์นี้ถูกใช้ลงทะเบียนแล้ว', error: '409' }, { status: 409 });
        }

        //const sess = await mongoose.startSession();
        //sess.startTransaction();

        const user = new User({
            gender,
            firstName, 
            lastName, 
            cardID, 
            phoneNo, 
            email,
            password:hashedPassword
        });

        await user.save();
        //await user.save({ session: sess });
       // await sess.commitTransaction();
        
        return NextResponse.json({success:true, message : "User registered."}, {status: 201});
    } catch (error) {
        return NextResponse.json({success:false, message : "An error occured while "}, {status: 500});
    }
}


export async function GET() {
    try {
        const allUsers = await User.find();
        return NextResponse.json({success:true, data: allUsers});
    } catch (error) {
        return NextResponse.json({success:false, message : "An error occured while "}, {status: 500});
    }
}