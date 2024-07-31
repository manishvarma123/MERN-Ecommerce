import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({ data, fetchdata }) => {

    const [editProduct, setEditProduct] = useState(false)

    return (
        <div className='border shadow-md bg-white p-4 rounded-md w-[200px]'>
            <div className='h-[170px] flex items-center'>
                <img src={data.productImage[0]} className='w-fit m-auto max-h-full' />
            </div>
            <h1 className='line-clamp-1'>{data.productName}</h1>

            <div className='flex justify-between items-center'>
                <div className='font-bold'>
                    {displayINRCurrency(data.sellingPrice)}
                </div>
                <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
                    <MdEdit />
                </div>
            </div>


            {
                editProduct && (
                    <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
                )
            }



        </div>
    )
}

export default AdminProductCard