import { Link, Navigate, redirect, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressCard from "./page/AddressCard";
import { differenceInCalendarDays,format } from "date-fns";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [redirect,setRedirect]=useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/bookings`).then(response => {
      const foundBooking = response.data.find(({_id}) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
    });
  }, [id]);

  if (!booking) return '';

  const numberOfNights = differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn));

  const handleCancelBooking = () => {
    if (acceptTerms) {
      axios.delete(`/bookings/${id}`).then(() => {
        alert("Booking canceled successfully.");
        setRedirect('/');
      });
    }
  };
  if(redirect){
    return <Navigate to={redirect}/>
  }

  const CardWidget = ({ booking }) => (
    <div className="bg-secondary rounded-lg p-4 mb-4 shadow-md text-white relative">
    <h2 className="text-xl uppercase font-semibold text-violet-500">{booking.place.title}</h2>
    <p className="mt-2">Check-in: <span className="text-violet-300">{format(new Date(booking.checkIn), 'MMMM dd, yyyy')}</span></p>
    <p>Check-out: <span className="text-violet-300">{format(new Date(booking.checkOut), 'MMMM dd, yyyy')}</span></p>
    <p>Nights: <span className="text-violet-300">{numberOfNights}</span></p>
    <div className="absolute top-4 right-4 bg-violet-500 text-white text-xl text-center font-bold rounded-lg  px-5 py-7 shadow-lg h-[100px]">
      Price: ${booking.price}
    </div>
  </div>
  
  );

  return (
    <div className="flex justify-center">
      <div className="mt-4 bg-gray-100 px-8 pt-8 max-w-4xl w-full">
        <CardWidget booking={booking} />

        <div className="shadow-lg w-full h-[545px] grid gap-2 rounded-3xl overflow-hidden grid-cols-[2fr_1fr]">
          <div>
            {booking.place.photos?.[0] && (
              <div>
                <img className="aspect-square object-cover cursor-pointer w-full" src={'http://localhost:3000/uploads/' + booking.place.photos[0]} alt="1" />
              </div>
            )}
          </div>
          <div className="grid">
            {booking.place.photos?.[1] && (
              <div>
                <img className="shadow-lg aspect-square object-cover cursor-pointer w-full" src={'http://localhost:3000/uploads/' + booking.place.photos[1]} alt="2" />
              </div>
            )}
            <div className="overflow-hidden">
            {booking.place.photos?.[2] && (
              <div>
                <img className=" aspect-square h-full w-full cursor-pointer object-cover relative top-2" src={'http://localhost:3000/uploads/' + booking.place.photos[2]} alt="3" />
              </div>
            )}
          </div>
          </div>
          
        </div>
        <div className="my-2 block font-semibold underline text-center">
        <AddressCard address={booking.place.address} />
      </div>
        <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-2">
          <div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl ">Description</h2>
              <p >{booking.place.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
             
            </div>
          </div>
          <div className="bg-secondary rounded-lg p-6 mb-6 shadow-lg text-white">
      <h2 className="font-semibold text-2xl mb-4">Contact Details</h2>
      <div className="flex items-center mb-2">
        <FontAwesomeIcon icon={faUser} className="text-violet-500 mr-2" />
        <p>Name: John Doe</p>
      </div>
      <div className="flex items-center mb-2">
        <FontAwesomeIcon icon={faEnvelope} className="text-violet-500 mr-2" />
        <p>Email: john.doe@example.com</p>
      </div>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faPhone} className="text-violet-500 mr-2" />
        <p>Mobile: (123) 456-7890</p>
      </div>
    </div>
        </div>
        <div className="bg-white px-8 py-8 border-t">
          <h2 className="font-semibold text-2xl">Extra info</h2>
          <div className="mt-2 text-sm text-gray-700 leading-5">{booking.place.extraInfo}</div>
        </div>
        <div className="mt-6 bg-secondary text-white rounded-lg p-6 mb-6 shadow-lg">
      <h2 className="font-semibold text-2xl mb-4">Cancel Booking</h2>
      <p className="mt-2">Please read the terms and conditions before canceling your booking.</p>
      <ul className="list-disc list-inside mt-2">
        <li>Cancellation must be done at least 48 hours before check-in date.</li>
        <li>A cancellation fee of 20% will be charged.</li>
        <li>Refund will be processed within 7-10 business days.</li>
      </ul>
      <div className="mt-4 flex items-center">
        <input 
          type="checkbox" 
          id="acceptTerms" 
          checked={acceptTerms} 
          onChange={() => setAcceptTerms(!acceptTerms)} 
          className="form-checkbox h-5 w-5 text-violet-500"
        />
        <label htmlFor="acceptTerms" className="ml-2">I accept the terms and conditions</label>
      </div>
      <button 
        className={`mt-4 py-2 px-4 rounded-lg ${acceptTerms ? 'bg-red-600 text-white' : 'bg-gray-400 text-gray-700'}`} 
        onClick={handleCancelBooking} 
        disabled={!acceptTerms}
      >
        Cancel Booking
      </button>
    </div>
      </div>
    </div>
  );
}
