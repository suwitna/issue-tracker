'use server';

import { dbConnect } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import Trip from '@/models/trip';

dbConnect();
export async function POST(req: NextRequest) {

    try {
        const { title, content, imageUrl1, imageUrl2, imageUrl3, imageUrl4 } = await req.json();

        console.log("title: ", title);
        console.log("content: ", content);
        console.log("imageUrl1: ", imageUrl1);
        console.log("imageUrl2: ", imageUrl2);
        console.log("imageUrl3: ", imageUrl3);
        console.log("imageUrl4: ", imageUrl4);

        const checkTitle = await Trip.findOne({title});
        if(checkTitle){
            console.log("Trip: ", checkTitle);
            return NextResponse.json({message: `${title}` + ' title ถูกใช้ลงทะเบียนแล้ว', error: '409' }, { status: 409 });
        }

        const trip = new Trip({
            title, content, imageUrl1, imageUrl2, imageUrl3, imageUrl4
        });

        await trip.save();
        
        return NextResponse.json({success:true, message : "Trip registered."}, {status: 201});
    } catch (error) {
        return NextResponse.json({success:false, message : "An error occured while "}, {status: 500});
    }
}


export async function GET() {
    try {
        const allTrips = await Trip.find();
        return NextResponse.json({success:true, data: allTrips});
    } catch (error) {
        return NextResponse.json({success:false, message : "An error occured while "}, {status: 500});
    }
}