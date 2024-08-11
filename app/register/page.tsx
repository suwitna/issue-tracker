'use client';

import React, { useState, useEffect } from 'react'


const RegisterPage = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cardID, setCardID] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAgree, setIsAgree] = useState(false)
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const clearState = () => {
    // Reset to initial value
    setFirstName("");
    setLastName("");
    setCardID("");
    setPhoneNo("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsAgree(false);
    setError("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setError("Password do not match!");
      return;
    } 

    if (!firstName || !lastName || !cardID || !phoneNo || !email || !password || !confirmPassword) {
      setError("Please complete all inputs.");
      return;
    }

    if (!isAgree) {
      setError("กดยอมรับ ข้อกำหนดและเงื่อนไข!");
      return;
    } 

    try {
      const res = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              firstName, lastName, cardID, phoneNo, email, password
          })
      })

      if(res.ok){
        const form = e.target;
        clearState();
        setSuccess("User registration successfully!");
        form.reset();
      } else {
        const result = await res.json();
        console.log("User registration failed.", result);
        setError(result.message);
      } 
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  }
  return (
    <div className="p-3 my-3">
      <div>
        <h3>สมัครสมาชิก</h3>
        <hr className='my-3'/>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          {error && (
              <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                  {error}
              </div>
          )}

          {success && (
              <div className='bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                  {success}
              </div>
          )}
          <div>
            <div>เพศ ชาย/หญิง</div>
            <div>ชาวต่างชาติ ?</div>
          </div>
          <div>
            <div>
              <input type="text" onChange={(e) => {setFirstName(e.target.value); setError(""); setSuccess("");}} className='w-50 bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='ชื่อ *' />
            </div>
            <div>
              <input type="text" onChange={(e) => {setLastName(e.target.value); setError(""); setSuccess("");}} className='w-50 bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='นามสกุล *' />
            </div>
          </div>
          <div>
              <input type="text" onChange={(e) => {setCardID(e.target.value); setError(""); setSuccess("");}} className='w-50 bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='เลขประจำตัวประชาชน *' />
          </div>
          <div>
              <input type="text" onChange={(e) => {setPhoneNo(e.target.value); setError(""); setSuccess("");}} className='w-50 bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='เบอร์โทรศัพท์ *' />
          </div>
          <div>
              <input type="text" onChange={(e) => {setEmail(e.target.value); setError(""); setSuccess("");}} className='w-50 bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='อีเมล์ *' />
          </div>
          <div>
              <input type="text" onChange={(e) => {setPassword(e.target.value); setError(""); setSuccess("");}} className='w-50 bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='รหัสผ่าน *' />
          </div>
          <div>
              <input type="text" onChange={(e) => {setConfirmPassword(e.target.value); setError(""); setSuccess("");}} className='w-50 bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='ยืนยันรหัสผ่าน *' />
          </div>
          <div>
            <input type="checkbox" onChange={(e) => {setIsAgree(e.target.checked); setError(""); setSuccess("");}}/>
            <label htmlFor="checkbox"> คุณยอมรับ ข้อกำหนดและเงื่อนไข</label>
          </div>
          <div>
          <button type='submit' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>ยืนยัน</button>
          </div>
          <div>มีบัญชีแล้ว ? เข้าสู่ระบบ</div>
        </form>
    </div>
  </div>
  )
}

export default RegisterPage
