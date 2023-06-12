import { getRates } from "@/utils";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";



export default function HotelCard({ hotel }: { hotel: HotelDataType }) {
  const rateArr = getRates(hotel.rating)
  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden w-full xl:w-96 p-2">
      <div className="block"> {/*2xl:flex*/}
         {/*2xl:flex-shrink-0*/}
         <figure>
          <div className="p-2 bg-slate-200 rounded-xl">
            <Image className="rounded-xl" width={512} height={512} src={`/hotels_images/${hotel.image}`} alt={hotel.name} />
          </div>
        </figure> {/*h-48  w-full object-cover 2xl:h-96 2xl:w-56*/}
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
            <Link href={`/rooms/${hotel.slug}`}>
              <button className="btn btn-primary">Check</button>
            </Link>
          </div>
        </div>
      </div>
    </div>

  )
}