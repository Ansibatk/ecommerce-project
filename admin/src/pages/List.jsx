import { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message)
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(
        backendUrl + '/api/product/remove',
        { data: { _id: id }, headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className="mb-2 text-gray-800 dark:text-gray-200">
        All Products List
      </p>

      <div className="flex flex-col gap-2">

        {/* ------ Table Header ------ */}
        <div className="
          hidden md:grid 
          grid-cols-[1fr_3fr_1fr_1fr_1fr] 
          items-center py-1 px-2 border 
          bg-gray-100 text-sm
          dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200
        ">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ------ Product Rows ------ */}
        {list.map((item, index) => (
          <div
            key={index}
            className="
              grid grid-cols-[1fr_3fr_1fr] 
              md:grid-cols-[1fr_3fr_1fr_1fr_1fr]
              items-center gap-2 py-1 px-2 
              border text-sm
              bg-white
              dark:bg-gray-900 
              dark:border-gray-700 
              dark:text-gray-200
            "
          >
            <img className="w-12 rounded-md" src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>

            <p
              onClick={() => removeProduct(item._id)}
              className="
                text-right md:text-center 
                cursor-pointer text-lg 
                text-red-600
                dark:text-red-400
              "
            >
              X
            </p>
          </div>
        ))}

      </div>
    </>
  )
}

export default List
