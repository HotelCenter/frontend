import { getRates } from "@/utils";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";



export default function HotelCard({ children, hotel }: { children: JSX.Element, hotel: HotelDataType }) {
  const rateArr = getRates(hotel.rating)
  return (
    <div className="relative max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden ">
      {children}

      <div className="xl:flex">
        <div className="xl:flex-shrink-0">
          <img className="h-48 xl:h-96 w-full object-cover xl:w-56" src={`/hotels_images/${hotel.image}`} alt={hotel.name} />
        </div>
        <div className="flex m-1 3xl:m-4 flex-col justify-between">
          <div>
            <h2 className="uppercase tracking-wide text-md text-indigo-500 font-semibold">{hotel.name}</h2>
            {/* <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{hotel.name}</a> */}
            <p className="mt-2 text-gray-500">{hotel.description}</p>
            <div className="mt-4 flex items-center">
              {rateArr.map((faIcon, i) => <FontAwesomeIcon icon={faIcon} key={i} className="text-yellow-200" />)}
              <span className="text-gray-700 ml-2">{hotel.rating}</span>
            </div>
          </div>
          <div>
            {/* <div className="cursor-pointer mt-2 3xl:mt-4 text-sm 3xl:text-md flex justify-center text-blue-500">
              <FontAwesomeIcon icon={faLocationDot} /> <span> {hotel.city} , {hotel.country}</span>
            </div> */}
          </div>
          <div className="mt-2 3xl:mt-6">
            <span className="text-gray-700 ml-2">4.5</span>
          </div>
        </div>
        <div className="mt-6">
          <Link href={`/rooms/${hotel.slug}`}>
            <button className="btn btn-primary">Check</button>
          </Link>
        </div>
      </div>
    </div>

  )
}