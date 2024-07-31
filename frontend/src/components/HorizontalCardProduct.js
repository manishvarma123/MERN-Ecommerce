import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const HorizontalCardProduct = ({ category, heading }) => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const loadingList = new Array(13).fill(null)

  const [scroll, setScroll] = useState(0)
  const scrollElement = useRef()

  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  const fetchData = async () => {
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(category)
    setLoading(false)

    setData(categoryProduct?.data)

  }

  useEffect(() => {
    fetchData()
  }, [])

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300
  }
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300
  }

  return (
    <div className='max-w-[1450px] mx-auto px-4 my-6 relative'>

      <h2 className='text-2xl font-bold py-2'>{heading}</h2>

      <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none duration-1000' ref={scrollElement}>
        <button className='bg-white shadow-md rounded-full p-2 absolute left-0 hidden md:block z-10' onClick={scrollLeft}><FaAngleLeft /></button>
        <button className='bg-white shadow-md rounded-full p-2 absolute right-0 hidden md:block z-10' onClick={scrollRight}><FaAngleRight /></button>
        {
          loading ? (
            loadingList.map((product, index) => {
              return (
                <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm border border-slate-300  shadow-md flex'>
                  <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>

                  </div>
                  <div className='p-2 grid w-full gap-2 '>
                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse rounded-full'></h2>
                    <p className='capitalize text-slate-700 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                    <div className='flex gap-3 w-full'>
                      <p className='text-red-600 font-bold p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                      <p className='text-slate-600 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                    </div>
                    <button className='text-sm bg-slate-200 text-white px-2 py-0.5 animate-pulse rounded-full'></button>
                  </div>
                </div>
              )
            })
          )
            :
            (
              data.map((product, index) => {
                return (
                  <Link to={"product/" + product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm border border-slate-300  shadow-md flex'>
                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                      <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all' />
                    </div>
                    <div className='p-2 grid'>
                      <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                      <p className='capitalize text-slate-700'>{product.category}</p>
                      <div className='flex gap-3'>
                        <p className='text-red-600 font-bold'>{displayINRCurrency(product?.sellingPrice)}</p>
                        <p className='text-slate-600 line-through'>{displayINRCurrency(product?.price)}</p>
                      </div>
                      <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-2 py-0.5 rounded-full' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                    </div>
                  </Link >
                )
              })
            )


        }
      </div>



    </div>
  )
}

export default HorizontalCardProduct