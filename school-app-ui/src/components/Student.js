import React from 'react'

function Student({course, setGrade, setIsOpen}) {
    return (
        <tr key = {course.courseName}>
            <td className="text-center px-6 py-4 whitespace-nowrap">
                <div className="text-gray-500">{course.courseName}</div>
            </td>
            <td className="text-center px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{course.fullName}</div>
            </td>
            <td className="text-center px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{course.grade}</div>
            </td>
            <td className="text-center px-6 py-4 whitespace-nowrap">
                <a 
                onClick={(e, courseName) => {setGrade(e, course.courseName, course.email); setIsOpen(true);}}
                className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer px-4">Set Grade</a>                   
            </td>
        </tr>
        
    )
}

export default Student