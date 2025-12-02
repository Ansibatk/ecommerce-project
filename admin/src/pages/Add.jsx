import { assets } from '../assets/assets'
import { useState } from 'react'
import axios from "axios";
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubcategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData,
        { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1('')
        setImage2('')
        setImage3('')
        setImage4('')
        setPrice('')
      }
      else {
        toast.error(response.data.message)
      }

    }
    catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-lg p-6 shadow-sm"
    >
      {/* Upload images */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
          Upload Image
        </p>

        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20 h-20 object-cover rounded-md border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>

          <label htmlFor="image2">
            <img
              className="w-20 h-20 object-cover rounded-md border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>

          <label htmlFor="image3">
            <img
              className="w-20 h-20 object-cover rounded-md border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>

          <label htmlFor="image4">
            <img
              className="w-20 h-20 object-cover rounded-md border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      {/* Name */}
      <div className="w-full">
        <p className="mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
          Product name
        </p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-900 
                     focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900
                     dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-gray-100"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
          Product description
        </p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-900 
                     focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900
                     dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-gray-100"
          type="text"
          placeholder="Write content here"
          required
        />
      </div>

      {/* Category / Subcategory / Price */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
            Product category
          </p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-900 
                       focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900
                       dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-gray-100"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
            Sub category
          </p>
          <select
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-900 
                       focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900
                       dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-gray-100"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
            Product price
          </p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px] rounded-md border border-gray-300 bg-white text-gray-900 
                       focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900
                       dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-gray-100"
            type="Number"
            placeholder="25"
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
          Product Sizes
        </p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes(prev =>
                prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer rounded-md border
                ${sizes.includes("S")
                  ? "bg-pink-100 border-pink-300 dark:bg-pink-300/60 dark:border-pink-300"
                  : "bg-slate-200 border-slate-300 dark:bg-gray-700 dark:border-gray-600"
                }`}
            >
              S
            </p>
          </div>

          <div
            onClick={() =>
              setSizes(prev =>
                prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer rounded-md border
                ${sizes.includes("M")
                  ? "bg-pink-100 border-pink-300 dark:bg-pink-300/60 dark:border-pink-300"
                  : "bg-slate-200 border-slate-300 dark:bg-gray-700 dark:border-gray-600"
                }`}
            >
              M
            </p>
          </div>

          <div
            onClick={() =>
              setSizes(prev =>
                prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer rounded-md border
                ${sizes.includes("L")
                  ? "bg-pink-100 border-pink-300 dark:bg-pink-300/60 dark:border-pink-300"
                  : "bg-slate-200 border-slate-300 dark:bg-gray-700 dark:border-gray-600"
                }`}
            >
              L
            </p>
          </div>

          <div
            onClick={() =>
              setSizes(prev =>
                prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer rounded-md border
                ${sizes.includes("XL")
                  ? "bg-pink-100 border-pink-300 dark:bg-pink-300/60 dark:border-pink-300"
                  : "bg-slate-200 border-slate-300 dark:bg-gray-700 dark:border-gray-600"
                }`}
            >
              XL
            </p>
          </div>

          <div
            onClick={() =>
              setSizes(prev =>
                prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer rounded-md border
                ${sizes.includes("XXL")
                  ? "bg-pink-100 border-pink-300 dark:bg-pink-300/60 dark:border-pink-300"
                  : "bg-slate-200 border-slate-300 dark:bg-gray-700 dark:border-gray-600"
                }`}
            >
              XXL
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-2 items-center">
          <input
            onChange={() => setBestseller(prev => !prev)}
            checked={bestseller}
            type="checkbox"
            id="bestseller"
            className="accent-gray-900 dark:accent-gray-200"
          />
          <label
            className="cursor-pointer text-sm text-gray-800 dark:text-gray-200"
            htmlFor="bestseller"
          >
            Add to bestseller
          </label>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black text-white rounded-md text-sm font-medium
                   hover:bg-gray-800 transition-colors
                   dark:bg-gray-100 dark:text-black dark:hover:bg-gray-200"
      >
        ADD
      </button>
    </form>
  )
}

export default Add
