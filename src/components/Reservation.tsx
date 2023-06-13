import React from 'react';

const Reservation = ({ reservation }:{reservation:ReservationDataType}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Reservation Details</div>
          <p className="text-gray-700 text-base">
            <strong>Amount:</strong> {reservation.amount}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Check-in Date:</strong> {reservation.checkin_date}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Checkout Date:</strong> {reservation.checkout_date}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Room ID:</strong> {reservation.room_id}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Children Count:</strong> {reservation.children_count}
          </p>
          <p className="text-gray-700 text-base">
            <strong>Adult Count:</strong> {reservation.adult_count}
          </p>
          {reservation.confirmed_payment !== undefined && (
            <p className="text-gray-700 text-base">
              <strong>Confirmed Payment:</strong>{' '}
              {reservation.confirmed_payment ? 'Yes' : 'No'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservation;
