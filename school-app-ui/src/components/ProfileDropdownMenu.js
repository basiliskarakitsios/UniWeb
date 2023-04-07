import { Menu, Transition } from '@headlessui/react'
import { Fragment} from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { signOut, useSession } from "next-auth/react"
import Link from 'next/link'


export default function ProfileDropdownMenu() {
  const {data: session}= useSession()

  return (
    <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-0 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <div className="flex items-center sm:space-x-2 justify-center ">
            <p className="text-white font-bold">{session.user.fullName}</p>
            
            <ChevronDownIcon
              className="ml-2 -mr-1 h-8 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </div>
        </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link 
                  href="/profile"
                  className={`${
                    active ? 'bg-slate-700 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  My Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={signOut}
                  className={`${
                    active ? 'bg-slate-700 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Log out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
