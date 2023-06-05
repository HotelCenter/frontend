"use client"

import HotelCanvas from '@/components/360Hotel/HotelCanvas'
import HotelCard from '@/components/HotelCard'
import SearchBar from '@/components/SearchBar'

export default function Home() {
  return (
    <main className='mx-6'>
      <div className='w-full h-80'>
        {/* <HotelCanvas /> */}
        <SearchBar />
      </div>
      <div className='grid grid-cols-3 grid-rows-3 gap-3'>
        <HotelCard />
        <HotelCard />
        <HotelCard />
        <HotelCard />
        <HotelCard />
        <HotelCard />
      </div>
    </main>
  )
}
