import React, { useState } from 'react'
import { IoMdCloudUpload } from "react-icons/io";
import {ImagetoBase64} from '../utility/ImagetoBase64'
import {toast} from 'react-hot-toast'

function NewProduct() {
    const [data,setData] =useState({
        name:"",
        category:"",
        image:"",
        price:"",
        description:""
    })
    const handleOnChange=(e)=>{
        const {name,value}=e.target
        setData((preve)=>{
            return{
                ...preve,
                [name]:value
            }
        })
    }
    const uploadeImage=async(e)=>{
        const data=await ImagetoBase64(e.target.files[0])
        //console.log(data)
        setData((preve)=>{
            return{
                ...preve,
                image:data
            }
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()

        console.log(data)
        const {name,image,category,price}=data
        if(name && image && category && price){
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/newproduct`,
            {
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(data)
            })
            const fetchRes = await fetchData.json()
            console.log(fetchRes)
            toast(fetchRes.message)
        }
        else {
            toast("Enter required Fields")
        }

    }   
    return (
    <div className='p-2  '>
        <form className='m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type={"text"} id="name"  className='bg-slate-200 p-1 my-1' onChange={handleOnChange}/>
            <label htmlFor='category'>Category</label>
            <select className='bg-slate-200 p-1 my-1' id='category' name='category'  onChange={handleOnChange}>
                <option value={"other"}>Select categorie</option>
                <option value={"sport"}>Sport</option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
            </select>
            <label htmlFor='image'>Image
            <div  className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer'>
                {
                    data.image?  <img src={data.image} alt='' className='h-full '/>:  <span className='text-5xl'><IoMdCloudUpload /></span>
                }
                <input type={"file"} accept='image/*' id='image' onChange={uploadeImage} className='hidden'/>
            </div></label>
            
            <label htmlFor='price' className='my-1'>Price</label>
            <input  type={"text"} id='price' className='bg-slate-200 p-1 my-1' name='price' onChange={handleOnChange}/>
            
            <label htmlFor='description' className='my-1'>Description</label>
            <textarea  row={2} id='description' name='description' className='bg-slate-200 p-1 my-1 resize-none'  onChange={handleOnChange}></textarea>
            <button className='w-full mt-2 bg-indigo-600  text-white py-2 rounded-md cursor-pointer font-semibold  '>Save</button>
        </form>
    </div>
    )
}

export default NewProduct