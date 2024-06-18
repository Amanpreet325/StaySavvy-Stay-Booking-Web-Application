import AccountNav from "../AccountNav";
import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { format,differenceInCalendarDays } from "date-fns";
import { UserContext } from "../UserContext"; // Import UserContext

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(UserContext); // Access user data

  useEffect(() => {
    axios.get('/bookings').then(response => {
       setBookings(response.data);
       console.log('bookings');
       console.log(response.data);
   }); }, []);

  return (
    <div>
      <AccountNav />
      <div className="mt-6 flex flex-col items-center">
        {bookings?.length > 0 && bookings.map(booking => (
          <Link key={booking._id} to={`/account/bookings/${booking._id}`} className="flex flex-col md:flex-row gap-4 bg-[#262626] rounded-2xl shadow-lg overflow-hidden mb-6 w-full md:w-3/4 p-4 text-white">
            <div className="w-full md:w-48 flex-shrink-0">
              <img className="rounded-xl h-full w-full object-cover" src={'http://localhost:3000/uploads/' + booking.place.photos[0]} alt={booking.place.title} />
            </div>
            <div className="py-3 pr-3 grow">
              <h2 className="text-2xl font-bold mb-2">{booking.place.title}</h2>
              <div className="mb-2">
                
              </div>
              <div className="flex items-center gap-1 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgb(147, 51, 234)" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
              </svg>

                <span>Check-in: {format(new Date(booking.checkIn), 'MMMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-1 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgb(147, 51, 234)" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                </svg>

                <span>Check-out: {format(new Date(booking.checkOut), 'MMMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-1 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgb(147, 51, 234)" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>

                <span>Nights : {differenceInCalendarDays(new Date(booking.checkOut),new Date(booking.checkIn))}</span>
              </div>
              <div className="flex items-center gap-1 mb-2">
              

                <span className="text-2xl font-semibold">Total price: <div className="flex text-purple-600 justify-normal"> <div className="w-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6" />
</svg></div><div>{booking.price}</div></div></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
