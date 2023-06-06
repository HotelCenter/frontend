import { getRates } from "@/utils";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

type HotelDataType = {
    id: number;
    user_id: number;
    name: string;
    address: string;
    city: string;
    postcode: string;
    country: string;
    phone_number: string;
    description: string;
    slug: string;
    image: string;
    rating: number;
    created_at: string;
    updated_at: string;
}

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
                <button className="btn btn-primary">Check Availability</button>
            </div>

        </div>

    </div>)
}