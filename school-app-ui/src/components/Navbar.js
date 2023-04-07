import { signOut, useSession } from "next-auth/react"
import ProfileDropdownMenu from "./ProfileDropdownMenu"
import {HiOutlineSearchCircle} from "react-icons/hi"


const Navbar = () => {
  const {data: session, status}= useSession()
  return (
    <div className="bg-gray-800">
        <div className="h-16 px-8 flex items-center">
          <a href="/" className="text-white font-bold bg-black bg-opacity-0 hover:bg-opacity-50 rounded-full px-2 py-1">UniWeb</a>
          {session && (
            <div className="flex flex-grow justify-end">
              <ProfileDropdownMenu></ProfileDropdownMenu>
            </div>
          )}          
        </div>
    </div>
  )
}

export default Navbar