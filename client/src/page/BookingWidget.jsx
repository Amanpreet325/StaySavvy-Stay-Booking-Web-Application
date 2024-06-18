import {Navigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import { UserContext } from "../UserContext";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";

export default function BookingWidget({place}) {
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckOut]=useState('');
    const [maxGuests,setMaxGuests]=useState(1);
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');
    const [redirect,setRedirect] = useState('');
    const {user}=useContext(UserContext);

    useEffect(()=>{
      if(user){
        setName(user.name);
      }

    },[user]);
    let numberOfNights=0;
    if(checkIn && checkOut){
      numberOfNights= differenceInCalendarDays(new Date(checkOut),new Date(checkIn));
    }
    function handleMaxGuestsChange(ev) {
        const value = parseInt(ev.target.value, 10);
        if (isNaN(value) || value < 1) {
          setMaxGuests('');
        } else {
          setMaxGuests(value);
        }
      }
      async function bookThisPlace() {
        const response = await axios.post('/bookings', {
          checkIn,checkOut,maxGuests,name,phone,
          place:place._id,
          price:numberOfNights*place.price + numberOfNights*place.price * 0.02,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
      }
    
      if (redirect) {
        return <Navigate to={redirect} />
      }  
    return(
        <div className=" bg-white border border-black shadow p-4 rounded-2xl ">
           <div className="text-2xl text-center flex justify-center items-center gap-1">
            Price : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
{place.price} / per night <br/></div>
            
            <div className="mt-4 border   rounded-2xl">
            <div className="flex">
              <div className="py-3 px-4">
              <label> Check In : </label>
              <input type="date" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} />
              </div>
            
            <div className=" border-l  py-3 px-4 ">
              <label> Check Out : </label>
              <input type="date" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)} />
            </div>
            </div>
            <div className=" my-4 py-3 px-4 border-t">
              <label >Number of Guests : </label>
              <input type="number" value={maxGuests} onChange={handleMaxGuestsChange}/>
            </div>
            {numberOfNights>0 && (
                <>
                <div className="py-3 px-4 border-t">
                  <label>Your Full Name:</label><br />
                  <input type="text" className="border shadow-sm" value={name} onChange={ev=>setName(ev.target.value)} />
                </div>
                <div className="py-3 px-4 border-t">
                  <label>Your Email:</label><br />
                  <input type="text" className="border shadow-sm" value={email} onChange={ev=>setEmail(ev.target.value)} />
                </div>
                <div className="py-3 px-4 border-t">
                  <label>Your Number:</label><br />
                  <input type="number" className="border shadow-sm" value={phone} onChange={ev=>setPhone(ev.target.value)} />
                </div>
                <div className="my-4 py-3 px-4 border-t"> Price for {numberOfNights} night : 
                <span> ${numberOfNights*place.price}</span><br />
                <span> <strong> GST - 12%</strong></span><br />
                <span><strong> Total Amount to Pay : ${numberOfNights*place.price } + ${numberOfNights*place.price * 0.12}  </strong></span><br />
                <span><strong>After Discount : ${numberOfNights*place.price + numberOfNights*place.price * 0.02 } </strong></span></div>
                </>
              )}
            </div>
            
            <button 
              className={`mt-2 w-full py-2 px-4 rounded-2xl text-white ${maxGuests < 1 || checkIn>checkOut ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary'}`} 
              onClick={() => {
                if (maxGuests >= 1) {
                  bookThisPlace();
                }
               
              } }
              disabled={maxGuests < 1} 
            >
              BOOK THIS PLACE
             
            </button>
          </div>

    )
};