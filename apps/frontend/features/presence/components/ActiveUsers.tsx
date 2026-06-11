import React from 'react'
import usePresence from '../hooks/usePresence'
import { FiUsers } from 'react-icons/fi'
import ActiveUsersList from './ActiveUsersList'

const ActiveUsers = () => {
    const { activeUsers } = usePresence()
    return (
        <div className=' group relative flex items-center gap-3'>
            <div className="w-30 text-gray-500 text-lg flex relative
                      items-center gap-2">
                <FiUsers />
                active users</div>

            <div className='text-blue-600 cursor-pointer underline  '>
                {activeUsers.length} users
            </div>
            <ActiveUsersList />
        </div>
    )
}

export default ActiveUsers