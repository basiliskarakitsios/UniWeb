import { useState} from 'react'
import { useSession } from "next-auth/react"
import CourseDetails from './CourseDetails'


const Course = ({course, deleteCourse, editCourse, setIsOpen, isHomePage, enlistToCourse}) => {
    const {data: session} = useSession()
    let [isDetailsOpen, setIsDetailsOpen] = useState(false)
    
    return (
        <>
            <CourseDetails course={course} isDetailsOpen={isDetailsOpen}  setIsDetailsOpen={setIsDetailsOpen}/>
            <tr key = {course.courseName}>
                <td className="text-center px-6 py-4 whitespace-nowrap">
                    <button 
                    onClick={() => setIsDetailsOpen(true)}
                    className="text-gray-500 font-bold bg-gray-800 bg-opacity-10 hover:bg-opacity-90 hover:text-white rounded-full px-2 py-1">{course.courseName}</button>
                </td>
                {session && (session.user.status == 'Student' || isHomePage && session.user.status == 'Teacher') && (
                <td className="text-center px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{course.teacherName}</div>
                </td>
                )}
                {!isHomePage && (
                <td className="text-center px-6 py-4 whitespace-nowrap">
                    {session && session.user.status == 'Teacher' && (
                    <>
                        <a 
                        onClick={(e, courseName) => {editCourse(e, course.courseName); setIsOpen(true);}}
                        className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer px-4">Edit</a>
                        <a 
                        onClick={(e, courseName) => deleteCourse(e, course.courseName)}
                        className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer">Delete</a>
                    </>
                    )}                
                    {session && session.user.status == 'Student' && (
                        <a 
                        onClick={(e, courseName) => {enlistToCourse(e, course.courseName)}}
                        className='text-indigo-600 hover:text-indigo-800 hover:cursor-pointer px-4'>Enlist</a>
                    )}
                </td>
                )}
            </tr>
      </>
    )
}
export default Course

