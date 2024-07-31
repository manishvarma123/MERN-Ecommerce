import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/displayCurrency'
import Context from '../context'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'

const VerticalCard = ({ loading, data = [] }) => {

    const loadingList = new Array(13).fill(null)

    const {fetchUserAddToCart} = useContext(Context)

    const handleAddToCart = async(e,id) => {
        await addToCart(e,id)
        fetchUserAddToCart()
    }

    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,300px))] justify-center md:justify-between md:gap-6 overflow-x-scroll scrollbar-none duration-1000'>

            {
                loading ? (
                    data.map((product, index) => {
                        return (
                            <div className='w-full min-w-[280px] md:min-w-[280px] max-w-[280px] md:max-w-[280px] bg-white rounded-sm border border-slate-300  shadow-md'>
                                <div className='bg-slate-200 h-44 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center animate-pulse'>

                                </div>
                                <div className='p-2 grid gap-2'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                    <p className='capitalize text-slate-700 p-1 py-2 animate-pulse rounded-full bg-slate-200'></p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-bold p-1 py-2 animate-pulse rounded-full bg-slate-200 w-full'></p>
                                        <p className='text-slate-600 line-through p-1 py-2 animate-pulse rounded-full bg-slate-200 w-full'></p>
                                    </div>
                                    <button className='text-sm text-white p-1 py-2 animate-pulse rounded-full bg-slate-200'></button>
                                </div>
                            </div>
                        )
                    })
                )
                    :
                    (
                        data.map((product, index) => {
                            return (
                                <Link to={"/product/" + product?._id} className='w-full min-w-[280px] md:min-w-[280px] max-w-[300px] md:max-w-[310px] bg-white rounded-sm border border-slate-300  shadow-md mb-4' onClick={scrollTop}>
                                    <div className='bg-slate-200 h-44 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center'>
                                        <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                                    </div>
                                    <div className='px-4 py-5 grid gap-2'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-700'>{product.category}</p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-bold'>{displayINRCurrency(product?.sellingPrice)}</p>
                                            <p className='text-slate-600 line-through'>{displayINRCurrency(product?.price)}</p>
                                        </div>
                                        <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-full' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                                    </div>
                                </Link>
                            )
                        })
                    )

            }
        </div>
    )
}

export default VerticalCard