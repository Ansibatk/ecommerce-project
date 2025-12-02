import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
          <img className='logo mb-5 w-32 cursor-pointer' src={assets.logo} alt="" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
          <p className='w-full md:w-2/3 text-gray-600'>
            Dreams Clothing brings you timeless fashion with comfort and quality. Explore stylish outfits for every occasion and express your unique style effortlessly.
          </p>
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li className='cursor-pointer hover:underline' onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</li>
            <Link to={'/about'} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className='hover:underline'><li>About us</li></Link>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+1-213-456-5674</li>
            <li>contact@dreams4u.com</li>
            <Link to={'/contact'} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className='hover:underline'><li>Contact us</li></Link>
          </ul>
        </div>

      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@ dreams4u.com - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
