import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'


const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const res = await fetch('http://localhost:5000/api/user/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            const data = await res.json()
            toast.success(data?.message)
        }
        catch (error) {
            console.log(error);
            }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
                <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                    <h2 className="prata-regular text-3xl">Forgot Password</h2>
                </div>
                <input type="email"
                    placeholder="Enter Email Address" onChange={(e) => setEmail(e.target.value)}
                    required
                    className='w-full px-3 py-2 border border-gray-800 dark:border-white login' />
                <button
                    className='bg-black text-white font-light px-8 py-2 mt-4'
                    type="submit">send link</button>
            </form>
        </>
    )
}
export default ForgotPassword
// {loading?'Sending....':'Send Reset Link'}
// export default ForgotPassword
