import { useState, useEffect } from "react"
import EditCourse from "./EditCourse"
import Course from "./Course"
import { useSession } from "next-auth/react"
import EnlistedCourseList from "./EnlistedCourseList"

const CourseList = ({course, allVisible, studentsCoursesVisible, isHomePage}) => {
    const COURSE_BASE_URL="http://localhost:8080/api/v1/courses"
    const ENLIST_BASE_URL="http://localhost:8080/api/v1/enlist"
    const [courses, setCourses] = useState(null)
    const [enlistedCourses, setEnlistedCourses] = useState(null)
    const [isEnlisted, setIsEnlisted] = useState(false)
    const [loading, setLoading] = useState(true)
    const [courseName, setCourseName] = useState(null)
    const [responseCourse, setResponseCourse] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [enlistedCourseInfo, setEnlistedCourseInfo] = useState(null)
    const {data: session} = useSession()
    
    

    useEffect(() => {
      const fetchData = async() => {
        setLoading(true)
        try{
            const response = await fetch(COURSE_BASE_URL)
            const courses = await response.json()
            setCourses(courses)
        }catch(error){
            console.log(error)
        }
        setLoading(false)  
      }
      fetchData()

    }, [course, responseCourse])


    const editCourse = (e, id) => {
        e.preventDefault()
        setCourseName(id)
    }

    const enlistToCourse = async (e, id) => {
        e.preventDefault()

        const response = await fetch(ENLIST_BASE_URL + '/' + session.user.emailId + '/' + id)
        const enlists = await response.json()
        if(enlists.ok) return true       

        const post = await fetch(ENLIST_BASE_URL, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({email: session.user.emailId, courseName: id, fullName: session.user.fullName, grade: -1})})
        const resPost = await post.json()

        const getAllEnlists = await fetch(ENLIST_BASE_URL)
        const allCourses = await getAllEnlists.json()
        const newEnlists = allCourses.filter((course) => course.fullName == session.user.fullName)
        setEnlistedCourses(newEnlists)
        
        // const getEnlistedCourseInfo = await fetch(COURSE_BASE_URL + '/' + id)
        // const info = await getEnlistedCourseInfo.json()
        // setEnlistedCourseInfo(info.teacherName)
        // console.log(enlistedCourseInfo)
    }

    const deleteCourse = (e, id) => {
        e.preventDefault()
        fetch(COURSE_BASE_URL + "/" + id, {
            method: "DELETE",
        }).then((res) => {
            if(courses){
                setCourses((prevElement) => {
                    return prevElement.filter((course) => course.courseName !== id)
                })
            }
        })
        // try {
        //     fetch(ENLIST_BASE_URL + "/" + id, {
        //         method: "DELETE",
        //     })
        // }catch(error){
            
        // }
    }

  return (
    <>
        <div className={`${allVisible? 'container mx-auto my-8 shadow-lg' : 'hidden'}`}>
            <div className="flex border-b">
                <table className="min-w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="text-center font-medium text-gray-800 py-3 px-4 w-1/3">Course Name</th>
                            {session && !loading && (session.user.status == 'Student' || isHomePage && session.user.status == 'Teacher') && (
                                <th className="text-center font-medium text-gray-800 py-3 px-4 w-1/3">Teacher Name</th>
                            )}
                            {!isHomePage && <th className="text-center font-medium text-gray-800 py-3 px-4 w-1/3">Actions</th>}
                        </tr>
                    </thead>

                    {session && !loading && (session.user.status == 'Teacher' && !isHomePage) && (
                        <tbody className="bg-white">
                            {courses?.filter(userDB => userDB.teacherName == session.user.fullName).map((course) => (
                                <Course 
                                course={course} 
                                key={course.courseName} 
                                deleteCourse={deleteCourse} 
                                editCourse={editCourse}
                                isOpen={isOpen} setIsOpen={setIsOpen}
                                isHomePage = {isHomePage}/>
                            ))}
                        </tbody>
                    )}
                    {session && !loading && (session.user.status == 'Student'|| isHomePage) && (
                        <tbody className="bg-white">
                            {courses?.map((course) => (
                                <Course 
                                course={course} 
                                key={course.courseName} 
                                enlistToCourse={enlistToCourse}
                                isHomePage = {isHomePage}/>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
        <EnlistedCourseList visible={studentsCoursesVisible} courses={enlistedCourses} setCourses={setEnlistedCourses}/>                      
        <EditCourse courseName={courseName} setResponseCourse={setResponseCourse} isOpen={isOpen} setIsOpen={setIsOpen}/>        
    </>
  )
}

export default CourseList