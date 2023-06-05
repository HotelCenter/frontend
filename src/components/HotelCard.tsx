import Image from "next/image";

export default function HotelCard() {
    return (<div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
            <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
                <button className="btn btn-primary">Reserve Now</button>
            </div>
        </div>
    </div>)
}