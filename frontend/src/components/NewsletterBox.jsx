import { useState } from 'react'
import { toast } from 'react-toastify';

const NewsletterBox = () => {

    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const onSubmitHandler = (event) => {
    event.preventDefault();
  
    if (!email) {
      toast.error("Please enter a valid email!");
      return;
    }

    toast.success("Thank you for subscribing!");
    setSubscribed(true);
    setEmail("");   
  }
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>
        Stay updated with our latest arrivals, exclusive deals, and fashion tips. Join our community today and enjoy 20% off your first order!
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none login' 
          type="email"
          value={email}
          placeholder='Enter your email' required
          onChange={(e) => setEmail(e.target.value)}
          disabled={subscribed} />
        <button type='submit'
         disabled={subscribed}
         className={`cursor-pointer text-xs px-10 py-4
            ${subscribed 
              ? "bg-green-600 text-white cursor-not-allowed" 
              : "bg-black text-white"
            }`}
         >{subscribed ? "SUBSCRIBED" : "SUBSCRIBE"}</button>
      </form>


    </div>
  )}


export default NewsletterBox
