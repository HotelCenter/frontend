'use client';
import Link from "next/link";
import { Carousel } from 'flowbite-react';




export default function RoomCard({ room }: { room: RoomDataType }) {

    return (
<div className='items-center justify-center'>
    <div className='w-full max-w-md  mx-auto bg-white rounded-3xl shadow-xl overflow-hidden'>
        <div className='max-w-md mx-auto'>
          {/* <div className='h-[236px]' style={{backgroundImage:'url(`/hotels_images/2.png`);background-size:cover;background-position:center'}}> */}
          <Carousel>
      <img
        alt="..."
        src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
      />
      <img
        alt="..."
        src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
      />
      <img
        alt="..."
        src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
      />
      <img
        alt="..."
        src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
      />
      <img
        alt="..."
        src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
      />
    </Carousel>           </div>
          <div className='p-4 sm:p-6'>
            <p className='font-bold text-gray-700 text-[22px] leading-7 mb-1'>hotel name</p>
            <div className='flex flex-row'>
              <p className='text-[#3C3C4399] text-[17px] mr-2 line-through'>{room.adult_price}$</p>
              <p className='text-[17px] font-bold text-[#0FB478]'>{room.adult_price}$</p>
            </div>
            <p className='text-[#7C7C80] font-[15px] mt-6'>Click the button to listen on Spotiwhy app.</p>

            <Link href={`/reserve?room=${room.id}`} target='_blank' className='block mt-10 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-[#FFC933] rounded-[14px] hover:bg-[#FFC933DD] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80'>
                  more details
            </Link>
            <a target='_blank' href="#" className='block mt-1.5 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform rounded-[14px] hover:bg-[#F2ECE7] hover:text-[#000000dd] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80'>
                  reserve now
              </a>
          </div>
        </div>
    </div>
// </div>
)
}