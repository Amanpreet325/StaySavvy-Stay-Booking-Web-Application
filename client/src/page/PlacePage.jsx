import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { differenceInCalendarDays } from "date-fns";
import BookingWidget from "./BookingWidget";
import AddressCard from "./AddressCard";
import Perksss from "./Perksss";
export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [checkIn,setCheckIn]=useState('');
  const [checkOut,setCheckOut]=useState('');
  const [maxGuests,setMaxGuests]=useState(1);
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [mobile,setMobile]=useState('');
  let numberOfNights=0;
  if(checkIn && checkOut){
    numberOfNights= differenceInCalendarDays(new Date(checkOut),new Date(checkIn));
  }
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then(response => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return '';
  function handleMaxGuestsChange(ev) {
    const value = parseInt(ev.target.value, 10);
    if (isNaN(value) || value < 1) {
      setMaxGuests('');
    } else {
      setMaxGuests(value);
    }
  }
  if (showAllPhotos) {
    return (
      <div className="absolute inset-0  min-h-screen">
        <div className="p-8 grid gap-7">
          <div>
            <h2 className="text-3xl">Photos of {place.title}</h2>
            <button onClick={() => setShowAllPhotos(false)} className="fixed bg-gray-700 text-white rounded-lg px-2 py-2 shadow-sm right-12 top-8 flex gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
close images
            </button>
        {place?.photos?.length > 0 && place.photos.map((photo, index) => (
          <div key={index} className="gap-3">
            <img src={'http://localhost:3000/uploads/' + photo} alt="" />
          </div>
          
        ))}
        </div>
      </div>
      </div>
    );
  }
  function samestyle(){
    return "aspect-square object-cover cursor-pointer w-full   ";

  }

  return (
    <div className="flex justify-center ">
      <div className="mt-4 bg-gray-100 px-8 pt-8 max-w-4xl w-full border border-black">
        <h1 className="text-3xl text-center 	text-transform: uppercase">{place.title}</h1>
        <hr className="mt-2 text-violet-500 h-1 bg-black"/>
        <div className="mt-4 w-full   h-[545px]  grid gap-2 rounded-3xl overflow-hidden grid-cols-[2fr_1fr]">
          <div>
            {place.photos?.[0] && (
              <div>
                <img className={samestyle()} src={'http://localhost:3000/uploads/' + place.photos[0]} alt="1" />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <div>
                
                <img className={samestyle()} src={'http://localhost:3000/uploads/' + place.photos[1]} alt="2" />
              </div>
)}
              {place.photos?.[2] && (
              <div>
                
                <img className="aspect-square h-full w-full  cursor-pointer object-cover relative top-2" src={'http://localhost:3000/uploads/' + place.photos[2]} alt="3" />
              </div>
            )}
            
          </div>
          
        </div>
        <div className="flex justify-center mt-4">
          <button className="py-2 px-4 rounded-lg bg-primary text-white" onClick={() => setShowAllPhotos(true)}>Show more</button>
        </div>

        <AddressCard address={place.address} />
        <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-2">
          <div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Description</h2>
              {place.description}
            </div>
            
          </div>
          <BookingWidget place={place}/>
          <div>
            <h2 className="font-semibold text-2xl">Booked</h2>
            {/* Add booking details or component here */}
          </div>
        </div>
        <div> 
        <Perksss perks={place.perks} /></div>


        <div className=" mt-4  px-8  bg-white py-8 border-t border-black">
          <h2 className="font-semibold text-2xl ">Extra info</h2>
          <div className="mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
          <div className=" mt-4 grid grid-cols-1 w-1/2">
            <div className="flex  items-center my-2 bg-secondary rounded-lg p-4 shadow-lg cursor-pointer transition duration-300 transform hover:shadow-xl hover:bg-purple-50">
                <div className="flex-grow text-purple-600 uppercase">Check-in:</div>
                <div className="text-white">{place.checkIn}</div>
            </div>
            <div className="flex items-center my-2 bg-secondary rounded-lg p-4 shadow-lg cursor-pointer transition duration-300 transform hover:shadow-xl hover:bg-purple-50">
                <div className="flex-grow text-purple-600 uppercase">Check-out:</div>
                <div className="text-white">{place.checkOut}</div>
            </div>
            <div className="flex items-center my-2 bg-secondary rounded-lg p-4 shadow-lg cursor-pointer transition duration-300 transform hover:shadow-xl hover:bg-purple-50">
                <div className="flex-grow text-purple-600 uppercase">Max number of guests:</div>
                <div className="text-white">{place.maxGuests}</div>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
}
