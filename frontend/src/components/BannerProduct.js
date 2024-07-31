import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'

import image1mobile from '../assest/banner/img1.webp'
import image2mobile from '../assest/banner/img2_mobile.webp'
import image3mobile from '../assest/banner/img3_mobile.jpg'
import image4mobile from '../assest/banner/img4_mobile.jpg'
import image5mobile from '../assest/banner/img5.webp'

import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";


const BannerProduct = () => {

    const [currentImage,setCurrentImage] = useState(0)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5,
    ]

    const mobileImage = [
        image1mobile,
        image2mobile,
        image3mobile,
        image4mobile,
        image5mobile,
    ]

    const nextImage = () => {
        if(desktopImages.length-1 > currentImage){
            setCurrentImage(preve => preve + 1)
        }
    }

    const preveImage = () => {
        if(currentImage != 0){
            setCurrentImage(preve => preve - 1)
        }
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopImages.length -1 > currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }
        },5000)

        return()=>clearInterval(interval)
    },[currentImage])

    return (
        <div className='max-w-[1450px] mx-auto px-4 rounded'>
            <div className='h-48 md:h-72 w-full bg-slate-200 relative'>

                <div className='absolute z-10 w-full h-full md:flex items-center hidden'>
                    <div className='flex justify-between w-full text-2xl px-6'>
                        <button onClick={preveImage} className='bg-white shadow-md rounded-full p-2'><FaAngleLeft /></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-2'><FaAngleRight /></button>
                    </div>
                </div>
                

                {/* desktop and tablet version */}
                <div className='hidden w-full h-full md:flex overflow-hidden'>
                    {
                        desktopImages.map((imageURL, index) => {
                            return (
                                <div className='w-full h-full min-h-full min-w-full transition-all duration-700' key={imageURL} style={{transform:`translateX(-${currentImage * 100}%)`}} >
                                    <img src={imageURL} className='w-full h-full' />
                                </div>
                            )
                        })
                    }
                </div>

                {/* mobile version */}
                <div className='w-full h-full flex overflow-hidden md:hidden'>
                    {
                        mobileImage.map((imageURL, index) => {
                            return (
                                <div className='w-full h-full min-h-full min-w-full transition-all duration-700' key={imageURL} style={{transform:`translateX(-${currentImage * 100}%)`}} >
                                    <img src={imageURL} className='w-full h-full' />
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default BannerProduct