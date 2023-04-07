const User = ({user, deleteUser, editUser, isOpen, setIsOpen}) => {
    
  return (
    <tr key = {user.emailId}>
        <td className="text-center px-6 py-4 whitespace-nowrap">
            <div className="text-gray-500">{user.emailId}</div>
        </td>
        <td className="text-center px-6 py-4 whitespace-nowrap">
            <div className="text-gray-500">{user.fullName}</div>
        </td>
        <td className="text-center px-6 py-4 whitespace-nowrap">
            <div className="text-gray-500">{user.status}</div>
        </td>
        {/* <td className="text-right px-6 py-4 whitespace-nowrap">
            <a 
            onClick={(e, emailId) => {editUser(e, user.emailId); setIsOpen(true);}}
            className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer px-4">Edit</a>
            <a 
            onClick={(e, emailId) => deleteUser(e, user.emailId)}
            className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer">Delete</a>
        </td> */}
    </tr>
  )
}

export default User