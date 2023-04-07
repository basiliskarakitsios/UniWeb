import { Fragment, useState, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { useSession } from "next-auth/react"

const EditCourse = ({courseName, setResponseCourse, isOpen, setIsOpen}) => {
    const COURSE_BASE_URL="http://localhost:8080/api/v1/courses"
    const [course, setCourse] = useState({
        courseName: "",
        teacherName: "",
        description: "",
        semester: 0,
        ects: 0,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(COURSE_BASE_URL + "/" + courseName, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const _course = await response.json()
                setCourse(_course)
                setIsOpen(true)
            }catch(error){
                console.log(error)
            }  
        }
        if(courseName){
            fetchData()
        }
    }, [courseName])

    const handleChange =  (event) => {
        const value = event.target.value
        setCourse({...course, [event.target.name]: value})
    }

    const updateCourse = async (e) => {
        e.preventDefault()
        const response = await fetch(COURSE_BASE_URL + "/" + courseName, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(course),
        })
        if(!response.ok){
            throw new Error("Something went wrong")
        }
        const _course = await response.json()
        setResponseCourse(_course)
        reset(e)
    }

    const reset = (e) => {
        e.preventDefault()
        setIsOpen(false)
    }

  return (
    <Transition appear show={isOpen} as={Fragment} >
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => {setIsOpen(false)}}>
            <div className="min-h-screen px-4 text-center">
                <Transition.Child 
                as={Fragment} 
                enter="ease-out duration-300" 
                enterFrom="opacity-0 scale-95" 
                enterTo="opacity-100 scale-100" 
                leave="ease-in duration-200" 
                leaveFrom="opacity-100 scale-100" 
                leaveTo="opacity-0 scale-95">
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Edit Course</Dialog.Title>
                        <div className="flex max-w-md max-auto">
                            <div className="py-2">
                                <form onSubmit={updateCourse}>
                                    <div className="h-13 my-4">
                                        <label className="block text-gray-600 text-sm font-normal">Course Name</label>
                                        <div 
                                        type="text" 
                                        name="courseName" 
                                        className="h-10 w-96 border mt-2 px-2 py-2"
                                        required>{course.courseName}</div>
                                        <label className="block text-gray-600 text-sm font-normal">Description</label>
                                        <textarea 
                                        type="text" 
                                        name="description" 
                                        value={course.description}
                                        onChange={(e) => handleChange(e)}
                                        className="h-52 w-96 border mt-2 px-2 py-2"
                                        required
                                        ></textarea>
                                        <label className="block text-gray-600 text-sm font-normal">Semester</label>
                                        <input 
                                        type="number" 
                                        min="0"
                                        name="semester" 
                                        value={course.semester}
                                        onChange={(e) => handleChange(e)}
                                        className="h-10 w-96 border mt-2 px-2 py-2"
                                        required
                                        ></input>
                                        <label className="block text-gray-600 text-sm font-normal">ECTS</label>
                                        <input 
                                        type="number"
                                        min="0" 
                                        name="ects" 
                                        value={course.ects}
                                        onChange={(e) => handleChange(e)}
                                        className="h-10 w-96 border mt-2 px-2 py-2"
                                        required
                                        ></input>
                                    </div>
                                    <div className="h=14 my-4 space-x-4 pt-4">
                                        <button 
                                        type="submit"
                                        className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6">Update</button>
                                        <button 
                                        onClick={reset} 
                                        className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6">Close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition>
  )
}

export default EditCourse