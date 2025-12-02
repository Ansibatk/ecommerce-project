import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')


  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password }, {
          headers: {
            "Content-Type": "application/json"
          }
        }
        )
        if (response.data.success) {
          toast.success("Account created successfully!");

          setToken(response.data.data.token)
          localStorage.setItem('token', response.data.data.token)
        } else {
          toast.error("invalid credentials")
        }
      }
      else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })

        if (response.data.success) {
          toast.success("login successfull")
          setToken(response.data.data.token)
          localStorage.setItem('token', response.data.data.token)
        } else {
          toast.error(response.data.message)
        }

      }
    }
    catch (error) {
      console.log(error);

      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
      </div>
      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} className='w-full px-3 py-2 border border-gray-800 dark:border-white login' type="text" placeholder='Name' required />}

      <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-full px-3 py-2 border border-gray-800 dark:border-white login' type="email" placeholder='Email' required />

      <input onChange={(e) => setPassword(e.target.value)} value={password} className='w-full px-3 py-2 border border-gray-800 dark:border-white login' type="password" placeholder='Password' required />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>
          <Link to="/forgot-password">Forgot your password?</Link></p>
        {
          currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p> :
            <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
