'use client';

import React, { useState, useEffect } from 'react'
import dynamic from "next/dynamic";
import axios from 'axios';

const Container = dynamic(() => import("@/app/components/Container"), { ssr: false });

const NewTripPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [imageUrl4, setImageUrl4] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const clearState = () => {
    // Reset to initial value
    setTitle("");
    setContent("");
    setImageUrl1("");
    setImageUrl2("");
    setImageUrl3("");
    setImageUrl4("");
    setError("");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title || !content || !imageUrl1) {
      setError("Please complete all inputs.");
      return;
    }

    try {
      const res = await axios.post('./api/trip', {
            title, content, imageUrl1, imageUrl2, imageUrl3, imageUrl4
        });

        if(res.data){
            const form = e.target;
            clearState();
            setSuccess("Trip registration successfully!");
            form.reset();
         } else {
            const result = await res.data;
            console.log("Trip registration failed.", result);
            
            if(result.error! && result.error == '409'){
                setError(result.message);
            }else{
                setError("Trip registration failed.");
            }

        } 
    } catch (error) {
        console.log("Error during registration: ", error);
    }
  }
  return (
    <Container>
      <div className='flex-grow'>
            <div className="flex justify-center items-center">
                <div className='w-[500px] shadow-xl p-10 mt-5 rounded-xl'>
                  <h3 className='font-bold'>สมัครสมาชิก</h3>
                  <hr className='my-3'/>

                  <form onSubmit={handleSubmit}>
                    {error && (
                        <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2 mb-3'>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className='bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2 mb-3'>
                            {success}
                        </div>
                    )}
                    <div>
                      <div>
                        <input type="text" onChange={(e) => {setTitle(e.target.value); setError(""); setSuccess("");}} className='w-50 bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='ชื่อทริป *' />
                      </div>
                      <div>
                        <input type="text" onChange={(e) => {setContent(e.target.value); setError(""); setSuccess("");}} className='w-50 bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='รายละเอียด *' />
                      </div>
                    </div>
                    <div>
                    <button type='submit' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>ยืนยัน</button>
                    </div>
                  </form>
                </div>
            <div>
          </div>
      </div>
    </div>
  </Container>
  )
}

export default NewTripPage
