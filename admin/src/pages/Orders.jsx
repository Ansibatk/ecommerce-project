import { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.data.reverse());
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-gray-800 dark:text-gray-200 mb-4">Order Page</h3>

      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="
              grid grid-cols-1 
              sm:grid-cols-[0.5fr_2fr_1fr] 
              lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr]
              gap-3 items-start 
              border-2 p-5 md:p-8 
              my-3 md:my-4
              text-xs sm:text-sm
              text-gray-700 dark:text-gray-200
              bg-white dark:bg-gray-900
              border-gray-200 dark:border-gray-700
            "
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />

            {/* Order Details */}
            <div>
              <div>
                {order.items.map((item, idx) => (
                  <p className="py-0.5" key={idx}>
                    {item.name} x {item.quantity} <span>{item.size}</span>
                    {idx !== order.items.length - 1 && ","}
                  </p>
                ))}
              </div>

              <p className="mt-3 mb-2 font-medium text-gray-900 dark:text-gray-100">
                {order.address.firstName + " " + order.address.lastName}
              </p>

              <div className="text-gray-700 dark:text-gray-300">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city + ", " +
                    order.address.state + ", " +
                    order.address.country + ", " + order.address.zipcode}
                </p>
              </div>

              <p className="mt-1">{order.address.phone}</p>
            </div>

            {/* Summary */}
            <div>
              <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Amount */}
            <p className="text-sm sm:text-[15px]">
              {currency}{order.amount}
            </p>

            {/* Status Dropdown */}
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="
                p-2 font-semibold rounded-md
                bg-gray-100 dark:bg-gray-800
                text-gray-800 dark:text-gray-200
                border dark:border-gray-700
              "
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
