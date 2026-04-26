import React from 'react'
import { assets } from '../assets/assets'

function AppDownload() {
  return (
    <div className='container px-4 2xl:px-20 mx-auto my-10'>
        <div className='relative bg-gradient-to-r from-violet-50 to-purple-50 py-12 px-6 sm:py-16 sm:px-10 lg:py-20 lg:px-16 xl:py-24 xl:px-20 2xl:py-28 2xl:px-28 rounded-2xl shadow-sm border border-gray-100 max-w-[1400px] mx-auto rounded-lg'>
            <div>
                <h1 className='text-2xl font-bold sm:text-4xl mb-8 max-w-md'>Download Mobile App for Better Experience</h1>
                <div className='flex gap-4'>
                    <a href="#" className='inline-block'>
                        <img className='h-12' src={assets.play_store} alt="" />
                    </a>
                    <a href="#" className='inline-block'>
                        <img className='h-12' src={assets.app_store} alt="" />
                    </a>
                </div>
            </div>
            <img className='absolute w-80 right-0 bottom-0 mr-32 max-lg:hidden' src={assets.app_main_img} alt="" />
        </div>
    </div>
  )
}

export default AppDownload