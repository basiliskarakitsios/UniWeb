import Head from 'next/head'
import Navbar from '@/components/Navbar'
import { getSession, useSession } from 'next-auth/react'
import Link from 'next/link'
import UserList from "../components/UserList"
import CourseList from "../components/CourseList"
import { useState } from "react"


export default function Home() {
  const { data: session } = useSession()
  const [visibleUsers, setVisibleUsers] = useState(false)
  const [visibleCourses, setVisibleCourses] = useState(false)

  function changeUsersButton(){
    setVisibleUsers(!visibleUsers)
    if(visibleUsers) document.getElementById("allUsersBtn").innerHTML = "Show Users"
    else document.getElementById("allUsersBtn").innerHTML = "Hide Users"
  }

  function changeCoursesButton(){
    setVisibleCourses(!visibleCourses)
    if(visibleCourses) document.getElementById("allCoursesBtn").innerHTML = "Show Courses"
    else document.getElementById("allCoursesBtn").innerHTML = "Hide Courses"
  }

  if(session){
    return (
      <div>
        <Head>
          <title>UniWeb</title>
        </Head>
        <Navbar />
        <main>
          <>
            <div className="container mx-auto my-8 space-x-10">
              <button id='allUsersBtn' onClick={() => changeUsersButton()} className="rounded bg-slate-800 hover:bg-slate-600 text-white px-4 py-2 font-semibold shadow-sm">Show Users</button>
              <button id='allCoursesBtn' onClick={() => changeCoursesButton()} className="rounded bg-slate-800 hover:bg-slate-600 text-white px-4 py-2 font-semibold shadow-sm">Show Courses</button>
            </div>
            <UserList visibleUsers = {visibleUsers} />
            <CourseList allVisible = {visibleCourses} isHomePage={true}/>
          </>
        </main>
      </div>
    )
  }else{
    return (
      <div className='h-screen w-screen bg-slate-500 place-items-center grid'>
        <Link 
        href='/login'
        className='w-fit bg-opacity-80 hover:bg-opacity-60 bg-slate-800 rounded-md py-5 px-5 text-gray-50 text-lg font-semibold shadow-xl'
        >Login to access this page</Link>
      </div>
    )
  }
}


// export async function getServerSideProps({context}){
//   const session = await getSession({context})
//   // if(!session){
//   //   return{
//   //     redirect: {
//   //       destination: 'login',
//   //       permanent: false
//   //     }
//   //   }
//   // }

//   return{
//     props: {session}
//   }
// }
