import { useState, useEffect } from "react"
import EnlistedCourse from "./EnlistedCourse"
import { useSession } from "next-auth/react"

const EnlistedCourseList = ({course, visible, isHomePage, courses, setCourses}) => {
    const ENLIST_BASE_URL="http://localhost:8080/api/v1/enlist"
    const [isOpen, setIsOpen] = useState(false)
    const {data: session} = useSession()

    useEffect(() => {
      const fetchData = async() => {
        try{
            const response = await fetch(ENLIST_BASE_URL)
            const allCourses = await response.json()
            const courses = allCourses.filter((course) => course.fullName == session.user.fullName)
            setCourses(courses)
        }catch(error){
            console.log(error)
        }
      }
      fetchData()

    }, [visible, course])


    const unregisterFromCourse = (e, id) => {
        e.preventDefault()
        fetch(ENLIST_BASE_URL + '/' + session.user.emailId + "/" + id, {
            method: "DELETE",
        }).then((res) => {
            if(courses){
                setCourses((prevElement) => {
                    return prevElement.filter((course) => course.courseName !== id)
                })
            }
        })
    }

  return (
    <>
        <div className={`${visible? 'container mx-auto my-8 shadow-lg' : 'hidden'}`}>
            <div className="flex border-b">
                <table className="min-w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="text-center font-medium text-gray-800 py-3 px-4 w-1/3">Course Name</th>
                            <th className="text-center font-medium text-gray-800 py-3 px-4 w-1/3">Grade</th>
                            <th className="text-center font-medium text-gray-800 py-3 px-4 w-1/3">Actions</th>
                        </tr>
                    </thead>
                        <tbody className="bg-white">
                            {courses && courses?.map((course) => (
                                <EnlistedCourse 
                                course={course}
                                key={course.courseName} 
                                unregisterFromCourse={unregisterFromCourse} 
                                isOpen={isOpen} setIsOpen={setIsOpen}
                                isHomePage = {isHomePage}/>
                            ))}
                        </tbody>
                </table>
            </div>
        </div>     
    </>
  )
}

export default EnlistedCourseList