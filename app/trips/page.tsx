'use client';

import React, { useEffect, useState } from "react";

const TripPage = () => {
  
  const [trips, setTrips] = useState([]);

   //console.log(data.products);
   const fetchUsers = async () => {
    try{
      const res = await fetch("http://localhost:3000/api/register", {
        cache: "no-store",
      });
      const data = await res.json();
      if(res.ok){
          console.log(data.data);
          //const products:Product[] = data.products;
          setTrips(data.data);
      } else {
          throw new Error("Failed to fetch data.");
      }

  }catch(error){
      console.log(error);
  }
}

  useEffect(()=> {
    fetchUsers();
  }, []);

  return (
    <>
      <div>
          <div className="p-3 my-3">
              <h3>Trips</h3>
          </div>
          <div className="grid grid-cols-4">
              {
              trips.map(trip => (
                <div key={trip._id} className="p-3 rounded-md shadow-md">
                  <h3 className="font-bold">{trip.firstName}{trip.lastName}</h3>
                  <p>Card ID: {trip.cardID}</p>
                  <p>Phone No: {trip.phoneNo}</p>
                  <p>e-Mail: {trip.email}</p>
                </div>
              ))
              }
          </div>
      </div>
  </>
  )
}

export default TripPage
