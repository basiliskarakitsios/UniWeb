import React from 'react'
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Student from "./Student"
import SetGrade from './SetGrade'

function StudentsList({visible}) {
    const [myStudents, setMyStudents] = useState(null)
    const [responseEnlist, setResponseEnlist] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [enlistName, setEnlistName] = useState(null)
    const [enlistEmail, setEnlistEmail] = useState(null)
    const COURSE_BASE_URL="http://localhost:8080/api/v1/courses"
    const ENLIST_BASE_URL="http://localhost:8080/api/v1/enlist"
    const {data: session} = useSession()

    

    useEffect(() => {
        const fetchData = async() => {
            try{
                //find my courses
                const responseFromCourses = await fetch(COURSE_BASE_URL)
                const allCourses = await responseFromCourses.json()
                const myCoursesList = allCourses.filter((course) => course.teacherName == session.user.fullName)

                // find my courses in enlist == find my students
                const responseFromEnlists = await fetch(ENLIST_BASE_URL)
                const allEnlists = await responseFromEnlists.json()
                myCoursesList.forEach(course => {                 
                    const myStudentsFromDB = allEnlists.filter(enlist => enlist.courseName == course.courseName)
                    setMyStudents(myStudentsFromDB)
                })
            }catch(error){
                console.log(error)
            } 
        }
        fetchData()
      }, [visible, responseEnlist])


    const setGrade = (e, courseName, email) => {
        e.preventDefault()
        setEnlistName(courseName)
        setEnlistEmail(email)
    }

    return (
        <>
            <div className={`${visible? 'container mx-auto my-8 shadow-lg' : 'hidden'}`}>
                <div className="flex border-b">
                    <table className="min-w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="text-center font-medium text-gray-800 py-3 px-4 w-1/4">Course Name</th>
                                <th className="text-center font-medium text-gray-800 py-3 px-4 w-1/4">Student Name</th>
                                <th className="text-center font-medium text-gray-800 py-3 px-4 w-1/4">Grade</th>
                                <th className="text-center font-medium text-gray-800 py-3 px-4 w-1/4">Actions</th>
                            </tr>
                        </thead>
                        {myStudents && myStudents.map((enlist) => (
                            <Student 
                                course = {enlist}
                                key={enlist.email} 
                                visible = {visible}
                                setGrade = {setGrade}
                                isOpen={isOpen} setIsOpen={setIsOpen}
                            />
                        ))}
                    </table>
                </div>
            </div>
            <SetGrade enlistName={enlistName} enlistEmail={enlistEmail} setResponseEnlist={setResponseEnlist} isOpen={isOpen} setIsOpen={setIsOpen}/>
        </>
    )
}

export default StudentsList