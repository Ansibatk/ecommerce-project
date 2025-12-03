import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
      return;
    }
    try {

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success(data?.message || 'Reset Successfully')
      }
      else {
        toast.error(data?.message || 'Something went wrong')
      }
    }
    catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}
        className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <h2 className='prata-regular text-3xl'>ResetPassword</h2>
        {message && <p className="text-red-500 text-center mb-4 font-medium">{message}</p>}
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter New Password"
          required
          className='w-full px-3 py-2 border border-gray-800 dark:border-white login'
        />

        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className='w-full px-3 py-2 border border-gray-800 dark:border-white login'
        />
        <button
          className='bg-black text-white font-light px-8 py-2 mt-4'
          type="submit">Reset Password</button>
      </form>
      <div className='mt-3 flex flex-col items-center'>
        <Link to="/login"
          className="text-blue-500 dark:text-blue-400 hover:hover:text-blue-700 underline"
        >Go to Login Page</Link>
      </div>
    </>
  )
}

export default ResetPassword
