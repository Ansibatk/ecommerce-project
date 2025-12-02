import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react';
import { ThemeContext } from '../context/AdminThemeContext';
import { Sun, Moon } from "lucide-react";

const Navbar = ({ setToken }) => {

  // -------Theme Context------
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className='
      flex items-center py-2 px-[4%] justify-between 
      bg-white border-b 
      dark:bg-gray-900 dark:border-gray-700
      transition-colors
    '>

      <img className='w-[max(10%,80px)] dark:invert dark:brightness-150 dark:contrast-125' src={assets.logo} alt="" />
      <div className="flex items-center gap-4">

        {/* Light / Dark Toggle Button */}
        <button
          onClick={toggleTheme}
          className="
          relative w-12 h-6 
          bg-gray-300 dark:bg-gray-700 
          rounded-full flex items-center 
          transition-all duration-300 px-1
        "
        >
          <div
            className={`
            absolute w-5 h-5 rounded-full bg-white shadow-md 
            flex items-center justify-center 
            transition-all duration-300
            ${theme === "light" ? "translate-x-0" : "translate-x-6"}
          `}
          >
            {theme === "light" ? (
              <Sun size={16} className="text-yellow-500" />
            ) : (
              <Moon size={16} className="text-blue-300" />
            )}
          </div>
        </button>

        <button
          onClick={() => setToken('')}
          className='
          bg-gray-600 text-white 
          dark:bg-gray-700 dark:text-white 
          px-5 py-2 sm:px-7 sm:py-2 
          rounded-full text-xs sm:text-sm 
          transition-colors
        '
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
