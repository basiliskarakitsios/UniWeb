import React from 'react'
import Head from 'next/head'
import Login from '@/components/Login'
import Link from 'next/link'
import { HiEyeOff, HiEye, HiAtSymbol } from "react-icons/hi"
import { useState } from 'react'
import { useFormik } from 'formik'
import {registerValidate} from '../../lib/validate'
import { useRouter } from 'next/router'

export default function register() {
    const router = useRouter()
    const [show, setShow] = useState(false)
    const [showCP, setShowCP] = useState(false)
    const formik = useFormik({
        initialValues:{
            fullName:'',
            status:'',
            email:'',
            password:'',
            confirmPassword:''
        },
        validate: registerValidate,
        onSubmit
    })

    async function onSubmit(values){
        const response = await fetch('http://localhost:3000/api/auth/signup', 
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(values)
            })
            .then(res => res.json())//.then(console.log(res))
            .then((data) => {
                if(data.message == "Registered User") router.push('http://localhost:3000')
                // if(!data) 
                else alert(data.message)
            })

    }

  return (
    <Login>
        <Head>
            <title>Register</title>
        </Head>
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
                <div title='title'>
                    <h1 className='text-gray-800 text-4xl font-bold py-3'> UniWeb</h1>
                    <p className='w-3/4 mx-auto text-gray-600'>Please register with your credentials</p>
                </div>
                
                <form 
                className='flex flex-col gap-3'
                onSubmit={formik.handleSubmit}>
                    <div className='flex border rounded-md relative'>
                        <input
                        className='w-full py-3 px-6 rounded-xl focus:outline-none border-none' 
                        type='text'
                        name='fullName' 
                        placeholder='Full Name'
                        required
                        {...formik.getFieldProps('fullName')}></input>
                    </div>
                    <div className={`${formik.errors.status && formik.touched.status ? 'flex border border-rose-600  rounded-md relative' : 'flex border rounded-md relative'}`}>
                        <input
                        className='w-full py-3 px-6 rounded-xl focus:outline-none border-none' 
                        type='text'
                        name='status' 
                        placeholder='Student or Teacher'
                        required
                        {...formik.getFieldProps('status')}></input>
                    </div>
                    <div className='flex border rounded-md relative'>
                        <input
                        className='w-full py-3 px-6 rounded-xl focus:outline-none border-none' 
                        type='email'
                        name='email' 
                        placeholder='Email'
                        required
                        pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                        {...formik.getFieldProps('email')}></input>
                        <span className='icon flex items-center px-4'>
                            <HiAtSymbol />
                        </span>
                    </div>
                    <div className={`${formik.errors.password && formik.touched.password ? 'flex border border-rose-600  rounded-md relative' : 'flex border rounded-md relative'}`}>
                        <input 
                        className='w-full py-3 px-6 rounded-xl focus:outline-none border-none' 
                        type={`${show? "text" : "password"}`}
                        name='password' 
                        placeholder='Password'
                        required
                        {...formik.getFieldProps('password')}></input>
                        <span 
                        className='icon flex items-center px-4 hover:cursor-pointer'
                        onClick={() => setShow(!show)}>
                            {show? <HiEyeOff /> : <HiEye />}
                        </span>
                    </div>
                    <div className={`${formik.errors.confirmPassword && formik.touched.confirmPassword ? 'flex border border-rose-600  rounded-md relative' : 'flex border rounded-md relative'}`}>
                        <input 
                        className='w-full py-3 px-6 rounded-xl focus:outline-none border-none' 
                        type={`${showCP? "text" : "password"}`}
                        name='confirmPassword' 
                        placeholder='Confirm Password'
                        required
                        {...formik.getFieldProps('confirmPassword')}></input>
                        <span 
                        className='icon flex items-center px-4 hover:cursor-pointer'
                        onClick={() => setShowCP(!showCP)}>
                            {showCP? <HiEyeOff /> : <HiEye />}
                        </span>
                    </div>
                    <div className='input-button'>
                        <button 
                        className='w-full bg-opacity-80 hover:bg-opacity-60 bg-slate-800 rounded-md py-3 text-gray-50 text-lg font-semibold shadow-xl'
                        type='submit'>Register</button>
                    </div>
                </form>

                <div className='gap-0'>
                    <p className='text-center text-gray-500 gap-5'>
                        You already have an account? 
                    </p>
                    <Link href={'/login'} className='text-blue-800'>
                            Login
                    </Link>
                </div>
            </section>
    </Login>
  )
}