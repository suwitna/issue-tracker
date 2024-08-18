'use server';

import { dbConnect } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user';

dbConnect();

export async function GET() {
    try {
        const allUsers = await User.find();
        return NextResponse.json({success:true, data: allUsers});
    } catch (error) {
        return NextResponse.json({success:false, message : "An error occured while "}, {status: 500});
    }
}