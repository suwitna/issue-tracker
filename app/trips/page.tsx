"use client"

import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from 'axios';


interface TripData{
    id: number;
    title: string;
    content: string;
    imageUrl1: string;
    imageUrl2: string;
    imageUrl3: string;
    imageUrl4: string;
}

const TripPage = () => {
    const [trips, setTrips] = useState<TripData[]>([]);

    const fetchTrips = async () => {
        try{
            const data = await axios.get('./api/trip');
            
            if(data.status == 200){
                console.log('Trip axios get: ', data);
                if(data.data.length > 0)
                  setTrips(data.data.trips);
                else
                  console.log('No trip data');
            } else {
                throw new Error("Failed to fetch data.");
            }

        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=> {
        fetchTrips();
      }, []);

    return (
        <>
            <div>
                <div className="p-3 my-3">
                    <Button><Link href='/trips/new'><div className='flex justify-center'><IoIosAddCircleOutline size={22}/><span>เพิ่มทริป</span></div></Link></Button>
                </div>
                <div className="grid grid-cols-4">
                    {trips.map(trip => (
                    <div key={trip.id} className="p-3 rounded-md shadow-md">
                        <h3 className="font-bold">{trip.title}</h3>
                        <Image src={trip.imageUrl1[0]} width={300} height={150} alt={trip.title} priority={true}/>
                        <p>Description: {trip.content}</p>
                    </div>
                    ))}
                </div>
            </div>
        </>
    )
  }

export default TripPage
