import { useState, useEffect } from "react"
import User from "./User"
import { signOut, useSession } from "next-auth/react"

const UserList = ({user, visibleUsers}) => {
    const USER_BASE_URL="http://localhost:8080/api/v1/users"
    const [users, setUsers] = useState(null)
    
    const [loading, setLoading] = useState(true)
    const [userEmailId, setUserEmailId] = useState(null)
    const [responseUser, setResponseUser] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const {data: session} = useSession()
       

    useEffect(() => {
      const fetchData = async() => {
        setLoading(true)
        try{
            const response = await fetch(USER_BASE_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const users = await response.json()
            setUsers(users)
        }catch(error){
            console.log(error)
        }
        setLoading(false)  
      }
      fetchData()
      
    }, [user, responseUser])


    const editUser = (e, id) => {
        e.preventDefault()
        setUserEmailId(id)
    }
    
    const deleteUser = (e, id) => {
        e.preventDefault()
        fetch(USER_BASE_URL + "/" + id, {
            method: "DELETE",
        }).then((res) => {
            if(users){
                setUsers((prevElement) => {
                    return prevElement.filter((user) => user.emailId !== id)
                })
                if(id == session.user.email){
                    signOut()
                } 
            }
        })
    }

  return (
    <div className={`${visibleUsers ? 'container mx-auto my-8 shadow-lg' : 'hidden'}`}>
        {/* <div> */}
            <table className="min-w-full">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="text-center font-medium text-gray-800 py-3 px-4 w-1/3">Email Address</th>
                        <th className="text-center font-medium text-gray-800 py-3 px-6 w-1/3">Full Name</th>
                        <th className="text-center font-medium text-gray-800 py-3 px-8 w-1/3">Status</th>
                    </tr>
                </thead>

                {session && !loading && (
                    <tbody className="bg-white">
                        {users?.map((user) => (
                            <User 
                            user={user} 
                            key={user.emailId} 
                            deleteUser={deleteUser} 
                            editUser={editUser}
                            isOpen={isOpen} setIsOpen={setIsOpen}/>
                        ))}
                        
                    </tbody>
                )}
            </table>
    </div>
  )
}

export default UserList