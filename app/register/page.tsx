'use client';

import React, { useState, useEffect } from 'react'
import Container from '@/app/components/Container';
import { validatePassword } from '@/app/utils/validatePassword';

const RegisterPage = () => {
  const [gender, setGender] = useState("");
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
    setGender("M");
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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setError("");
    setSuccess("");

    const newPassword = e.target.value;
    setPassword(newPassword);

    const check = validatePassword(newPassword);
    
    if (!check){
      setError("รหัสผ่าน ต้องมีความยาวอย่างน้อย 6 ตัวอักษร และประกอบด้วย ตัวพิมพ์ใหญ่, ตัวพิมพ์เล็ก, ตัวเลข");
      return;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const check = validatePassword(password);
    if (!check){
      setError("รหัสผ่าน ต้องมีความยาวอย่างน้อย 6 ตัวอักษร และประกอบด้วย ตัวพิมพ์ใหญ่, ตัวพิมพ์เล็ก, ตัวเลข");
      return;
    }

    if (password != confirmPassword) {
      setError("Password do not match!");
      return;
    } 

    if (!gender || !firstName || !lastName || !cardID || !phoneNo || !email || !password || !confirmPassword) {
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
            gender, firstName, lastName, cardID, phoneNo, email, password
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
        if(result.error! && result.error == '409'){
          setError(result.message);
        }else{
          setError("User registration failed.");
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
                    <div className='flex w-full justify-start space-x-5 h-8'>
                      <div className='font-bold'>เพศ</div>
                      <div className='space-x-3 px-3'>
                          <label><input type="radio" name="gender" value="M" onChange={(e) => {setGender(e.target.value);}}/> ชาย</label>
                          <label><input type="radio" name="gender" value="F" onChange={(e) => {setGender(e.target.value);}}/> หญิง</label>
                          <label><input type="radio" name="gender" value="O" onChange={(e) => {setGender(e.target.value);}}/> ไม่ระบุ</label>
                      </div>
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
                        <input type="password" onBlur={handleBlur} className='w-50 bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='รหัสผ่าน *' />
                    </div>
                    <div>
                        <input type="password" onChange={(e) => {setConfirmPassword(e.target.value); setError(""); setSuccess("");}} className='w-50 bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='ยืนยันรหัสผ่าน *' />
                    </div>
                    <div className='space-x-5 h-8'>
                      <label><input type="checkbox" onChange={(e) => {setIsAgree(e.target.checked); setError(""); setSuccess("");}}/> คุณยอมรับ ข้อกำหนดและเงื่อนไข</label>
                    </div>
                    <div>
                    <button type='submit' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>ยืนยัน</button>
                    </div>
                    <div>มีบัญชีแล้ว ? เข้าสู่ระบบ</div>
                  </form>
                </div>
            <div>
          </div>
      </div>
    </div>
  </Container>
  )
}

export default RegisterPage
