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
type ReservationDataType = {
    amount: number,
    checkin_date: string,
    checkout_date: string,
    room_id: number,
    children_count: number,
    adult_count: number,
    confirmed_payment?: boolean
};

type UserDataType = {
    id: number;
    first_name: string;
    email: string;
    email_verified_at: null | string;
    created_at: string;
    updated_at: string;
    last_name: string;
    address: string;
    country: string;
    city: string;
    phone_number: string;
    code_postal: string;
<<<<<<< HEAD
}

type MiddleRoutes = {
    key: Array<any> | null | object
=======
    is_admin: boolean
}

type MiddleRoutes = {
    [key: string]: object | Array<number | string> | null
>>>>>>> admin
}