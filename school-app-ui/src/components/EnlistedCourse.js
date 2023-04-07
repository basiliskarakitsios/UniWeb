const EnlistedCourse = ({course, unregisterFromCourse}) => {    
    return (
        <tr key = {course.courseName}>
            <td className="text-center px-6 py-4 whitespace-nowrap">
                <div className="text-gray-500">{course.courseName}</div>
            </td>
            <td className="text-center px-6 py-4 whitespace-nowrap">
                <div className="text-gray-500">{course.grade}</div>
            </td>        
            <td className="text-center px-6 py-4 whitespace-nowrap">
                <a 
                onClick={(e, courseName) => unregisterFromCourse(e, course.courseName)}
                className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer">Unregister</a>
            </td>
        </tr>
    )
}
export default EnlistedCourse

