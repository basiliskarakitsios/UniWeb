import {React, useState} from 'react'
import Head from 'next/head'
import Navbar from '@/components/Navbar'
import { useSession } from 'next-auth/react'
import AddCourse from "../components/AddCourse"
import CourseList from "../components/CourseList"
import StudentsList from "../components/StudentsList"



export default function profile() {
  const {data: session} = useSession()
  const [addCourseModal, setAddCourseModal] = useState(false)
  const [allCoursesVisible, setAllCoursesVisible] = useState(false)
  const [myCoursesVisible, setMyCoursesVisible] = useState(false)
  const [myStudentsVisible, setMyStudentsVisible] = useState(false)

  function allCoursesButton(){
    setAllCoursesVisible(!allCoursesVisible)
    if(allCoursesVisible) document.getElementById("allCoursesBtn").innerHTML = "Show All Courses"
    else document.getElementById("allCoursesBtn").innerHTML = "Hide All Courses"
  }

  function myCoursesButton(){
    setMyCoursesVisible(!myCoursesVisible)
    if(myCoursesVisible) document.getElementById("myCoursesBtn").innerHTML = "Show My Courses"
    else document.getElementById("myCoursesBtn").innerHTML = "Hide My Courses"
  }

  function myStudentsButton(){
    setMyStudentsVisible(!myStudentsVisible)
    if(myStudentsVisible) document.getElementById("myStudentsBtn").innerHTML = "Show My Students"
    else document.getElementById("myStudentsBtn").innerHTML = "Hide My Students"
  }

  return (
    <div>
        <Head>
          <title>My Profile</title>
        </Head>
        <Navbar />
        <main>
          {session && session.user.status == "Teacher" &&
            <>
              <div className="container mx-auto my-8 space-x-10">
                <button onClick={() => setAddCourseModal(true)} className="rounded bg-slate-800 hover:bg-slate-600   text-white px-4 py-2 font-semibold shadow-sm">Add Course</button>
                <button id='myCoursesBtn' onClick={() => myCoursesButton()} className="rounded bg-slate-800 hover:bg-slate-600 text-white px-4 py-2 font-semibold shadow-sm">Show my Courses</button>
                <button id='myStudentsBtn' onClick={() => myStudentsButton()} className="rounded bg-slate-800 hover:bg-slate-600 text-white px-4 py-2 font-semibold shadow-sm">Show my Students</button> 
              </div>
              <AddCourse isOpen={addCourseModal} setIsOpen={setAddCourseModal} visible={myCoursesVisible}/>
              <StudentsList visible={myStudentsVisible}/> 
            </>
          }
          {session && session.user.status == "Student" &&
            <>
              <div className="container mx-auto my-8 space-x-10">
                <button id='allCoursesBtn' onClick={() => allCoursesButton()} className="rounded bg-slate-800 hover:bg-slate-600 text-white px-4 py-2 font-semibold shadow-sm">Show All Courses</button>
                <button id='myCoursesBtn' onClick={() => myCoursesButton()} className="rounded bg-slate-800 hover:bg-slate-600 text-white px-4 py-2 font-semibold shadow-sm">Show My Courses</button>
              </div>
              <CourseList allVisible={allCoursesVisible} studentsCoursesVisible={myCoursesVisible} isHomePage={false}/>   
            </>
          }
        </main>
      </div>
  )
}