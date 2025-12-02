import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  )

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
      <ToastContainer />

      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />

          <hr className="border-gray-200 dark:border-gray-800" />

          <div className="flex w-full">
            <Sidebar />

            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 dark:text-gray-200 text-base transition-colors">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
