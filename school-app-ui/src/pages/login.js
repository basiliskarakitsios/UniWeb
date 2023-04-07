import React from 'react'
import Head from 'next/head'
import Login from '@/components/Login'
import Link from 'next/link'
import { HiEyeOff, HiEye, HiAtSymbol } from "react-icons/hi"
import { useState } from 'react'
import { useFormik } from 'formik'
import { loginValidate } from '../../lib/validate'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function login() {
    const [show, setShow] = useState(false)
    const router = useRouter()
    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validate: loginValidate,
        onSubmit
    })

    async function onSubmit(values){
        const status = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: "/"
        })
        if(status.ok) router.push(status.url)
        else alert(status.error)
    }

  return (
    <Login>
        <div>
            <Head>
                <title>Login</title>
            </Head> 
            <section className='w-3/4 mx-auto flex flex-col gap-10'>
                <div title='title'>
                    <h1 className='text-gray-800 text-4xl font-bold py-4'> UniWeb</h1>
                    <p className=' text-gray-600'>Please login using your credentials</p>
                </div>
                
                <form 
                className='flex flex-col gap-5' 
                onSubmit={formik.handleSubmit}>
                    <div className='flex border rounded-md relative'>
                        <input
                        className='w-full py-4 px-6 rounded-xl focus:outline-none border-none' 
                        type='email'
                        name='email' 
                        placeholder='Email'
                        required
                        pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                        {...formik.getFieldProps('email')}>
                        </input>
                        <span className='icon flex items-center px-4'>
                            <HiAtSymbol />
                        </span>
                    </div>
                    <div className={`${formik.errors.password && formik.touched.password ? 'flex border border-rose-600  rounded-md relative' : 'flex border rounded-md relative'}`}>
                        <input 
                        className='w-full py-4 px-6 rounded-xl focus:outline-none border-none' 
                        type={`${show? "text" : "password"}`}
                        name='password' 
                        placeholder='Password'
                        required
                        {...formik.getFieldProps('password')}>
                        </input>
                        <span 
                        className='icon flex items-center px-4 hover:cursor-pointer'
                        onClick={() => setShow(!show)}>
                            {show? <HiEyeOff /> : <HiEye />}
                        </span>
                    </div>

                    <div className='input-button'>
                        <button 
                        className='w-full bg-opacity-80 hover:bg-opacity-60 bg-slate-800 rounded-md py-3 text-gray-50 text-lg font-semibold shadow-xl'
                        type='submit'>Login</button>
                    </div>
                </form>

                <div className='gap-0'>
                    <p className='text-center text-gray-500 gap-5'>
                        You don't have an account yet? 
                    </p>
                    <Link href={'/register'} className='text-blue-800'>
                            Register
                    </Link>
                </div>
            </section>
        </div>
    </Login>
  )
}