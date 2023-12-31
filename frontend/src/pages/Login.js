import React, { useState } from 'react'
import icons_user from '../images/icons8-user.gif';
import { BiShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import {useDispatch} from 'react-redux'
import { loginUser} from "../redux/slices/authSlice";
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from "sonner";

const Login =()=> {
    const dispatch = useDispatch();
    const nav = useNavigate()

    const [showPassword,setShowPassword]=useState(false)
    const [data,setData]=useState({
        email:"",
        password:""
    })
  

    const handlShowPassword=()=>{
        setShowPassword(preve=>!preve)
    }
    
    const handleChangee=(e)=>{
            const {name,value}=e.target
            setData((preve)=>{
                return{
                    ...preve,
                    [name] : value
                }
            })
    }
    const handlSubmit = async (e) => {
        e.preventDefault();
        const data = {
            "email": e.target[0].value,
         "password":  e.target[1].value
            };
        const {  email, password } = data;
        if (email && password) {
            dispatch(loginUser({ data, toast, nav }))
        } else {
        alert("error");
        }


   }
    return(
<div className='p-3 md:p-4'>
<Toaster richColors position="bottom-center" />

        <div className='w-full max-w-sm bg-white m-auto flex  flex-col p-4'>
        <h1 className="text-center text-lg font-bold text-gray-500">LOGIN</h1>
       
            <div className="w-20 overflow-hidden rounded-full  flex items-center m-auto  pb-2 mb-4">
            <img src={icons_user} className='w-full ' alt='' />
            </div>
            <form className="w-full py-3  " onSubmit={handlSubmit}>
            <input type="text"  placeholder="email" id='email' name='email' className="w-full px-4 py-2 mb-3 bg-gray-50 rounded focus-within:outline-blue-300" value={data.email} onChange={handleChangee}/>
            <div className=" flex  px-4 py-2 bg-gray-50 rounded mt-1 mb-3  focus-within:outline focus-within:outline-blue-300 ">
            <input type={showPassword?"text":"password"}  placeholder="password" id='password' name='password' className='w-full bg-state-200 rounded   bg-gray-50  border-none outline-none' value={data.password} onChange={handleChangee}/>
            <span className='flex text-xl cursor-pointer ' onClick={handlShowPassword}>{showPassword?<BiShow/>:<BiSolidHide />}</span>
            </div>
        
            <input type='submit'  className="w-full mt-2 bg-indigo-600 text-white py-2 rounded-md cursor-pointer font-semibold  " value='Login'/>
        </form>
        <p className='text-left text-sm mt-1'>Donthave account? <Link to={"/signup"} className='text-red-500 underline'>Sign Up </Link></p>
        </div>
</div>
)
}
export default Login;