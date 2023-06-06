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
};

type RoomDataType = {
    id: number;
    date_available: string;
    date_booked: string;
    minimum_children: number;
    minimum_adults: number;
    base_price: number;
    adult_price: number;
    child_price: number;
    taxes: number;
    discount: number;
    characteristics: string;
};