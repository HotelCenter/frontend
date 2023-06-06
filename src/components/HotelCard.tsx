import { getRates } from "@/utils";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";



export default function HotelCard({ hotel }: { hotel: HotelDataType }) {
    const rateArr = getRates(hotel.rating)
    return (<div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
            <Image width={512} height={512} src={`/hotels_images/${hotel.image}`} alt={hotel.name} />
        </figure>
        <div className="card-body">
            <div>
                <h2 className="card-title">{hotel.name}</h2>
                <p>{hotel.description}</p>
            </div>
            <div className="text-md">
                <FontAwesomeIcon icon={faLocationDot} /> {hotel.city},{hotel.country}
            </div>
            <div className="card-actions justify-end">

                <div className="w-full ">
                    {rateArr}
                </div>
                <button className="btn btn-primary">
                    <Link href={`/rooms/${hotel.slug}`}> Check Availability</Link>
                </button>
            </div>

        </div>

    </div>)
}