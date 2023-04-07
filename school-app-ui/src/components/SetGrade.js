import { Fragment, useState, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"

const SetGrade = ({enlistName, enlistEmail, setResponseEnlist, isOpen, setIsOpen}) => {
    const ENLIST_BASE_URL="http://localhost:8080/api/v1/enlist"
    const [enlist, setEnlist] = useState({
        courseName: "",
        email: "",
        fullName: "",
        grade: 0,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(ENLIST_BASE_URL + "/" + enlistEmail + "/" + enlistName)
                const _enlist = await response.json()
                setEnlist(_enlist)
                setIsOpen(true)
            }catch(error){
                console.log(error)
            }  
        }
        if(enlistName){
            fetchData()
        }
    }, [enlistName])

    const handleChange =  (event) => {
        const value = event.target.value
        setEnlist({...enlist, [event.target.name]: value})
    }

    const updateEnlist = async (e) => {
        e.preventDefault()
        const response = await fetch(ENLIST_BASE_URL + "/" + enlistEmail + "/" + enlistName, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(enlist),
        })
        if(!response.ok){
            throw new Error("Something went wrong")
        }
        const _enlist = await response.json()
        setResponseEnlist(_enlist)
        reset(e)
    }

    const reset = (e) => {
        e.preventDefault()
        setIsOpen(false)
    }

  return (
    <Transition appear show={isOpen} as={Fragment} >
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => setIsOpen(false)}>
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
                                <form onSubmit={updateEnlist}>
                                    <div className="h-13 my-4">
                                        <label className="block text-gray-600 text-sm font-normal">Course Name</label>
                                        <div 
                                        type="text" 
                                        name="courseName" 
                                        className="h-10 w-96 border mt-2 px-2 py-2"
                                        required>{enlist.courseName}</div>
                                        <label className="block text-gray-600 text-sm font-normal">Full Name</label>
                                        <div 
                                        type="text" 
                                        name="fullName" 
                                        className="h-10 w-96 border mt-2 px-2 py-2"
                                        required>{enlist.fullName}</div>
                                        <label className="block text-gray-600 text-sm font-normal">Email</label>
                                        <div 
                                        type="text" 
                                        name="email" 
                                        className="h-10 w-96 border mt-2 px-2 py-2"
                                        required>{enlist.email}</div>
                                        <label className="block text-gray-600 text-sm font-normal">Grade</label>
                                        <input 
                                        type="number" 
                                        min="0"
                                        max="10"
                                        name="grade" 
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

export default SetGrade