import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

function CourseDetails({course, isDetailsOpen, setIsDetailsOpen}) {

  return (
    <Transition appear show={isDetailsOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsDetailsOpen(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h3"
                        className="text-2xl font-bold leading-6 text-gray-900">Course Details
                    </Dialog.Title>
                        <div className="grid divide-y">
                            <div className="mt-2 text-lg text-gray-700 font-bold">Name
                                <p className="text-base text-gray-700 font-normal">
                                {course.courseName}
                                </p>
                            </div>

                            <div className="mt-2 text-lg text-gray-700 font-bold">Description
                                <p className="text-base text-gray-700 font-normal">
                                {course.description}
                                </p>
                            </div>

                            <div className="mt-2 text-lg text-gray-700 font-bold">Semester
                                <p className="text-base text-gray-700 font-normal">
                                {course.semester}
                                </p>
                            </div>

                            <div className="mt-2 text-lg text-gray-700 font-bold">ECTS
                                <p className="text-base text-gray-700 font-normal">
                                {course.ects}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() =>setIsDetailsOpen(false)}
                            >
                            Close
                            </button>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
  )
}

export default CourseDetails