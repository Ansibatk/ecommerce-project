import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 border-gray-200 bg-white text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink
          className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-700'
          to="/add"
        >
          <img className='w-5 h-5 dark:invert dark:brightness-200 dark:contrast-100' src={assets.add_icon} alt="" />
          <p className='hidden md:block'>Add Items</p>
        </NavLink>

        <NavLink
          className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-700'
          to="/list"
        >
          <img className='w-5 h-5 dark:invert dark:brightness-200 dark:contrast-100' src={assets.order_icon} alt="" />
          <p className='hidden md:block'>List Items</p>
        </NavLink>

        <NavLink
          className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-700'
          to="/orders"
        >
          <img className='w-5 h-5 dark:invert dark:brightness-200 dark:contrast-100' src={assets.order_icon} alt="" />
          <p className='hidden md:block'>Orders</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar
