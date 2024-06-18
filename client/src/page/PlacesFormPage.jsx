import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "../Perks.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import '../submit.css';
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav.jsx";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);
  const [buttonState, setButtonState] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/' + id).then(response => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4 ">{text}</h2>
    );
  }

  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }

  function preInput(header, description) {
    return (
      <div className="text-left">
        {inputHeader(header)}
        {inputDescription(description)}
      </div>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests, price,
    };
    try {
      if (id) {
        // update
        await axios.put('/places', {
          id, ...placeData
        });
      } else {
        // new place
        await axios.post('/places', placeData);
      }
      setButtonState("submited");
      setTimeout(() => setRedirect(true), 2000);
    } catch (error) {
      console.error("Error saving place", error);
      setButtonState("");
    }
  }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
    <div>
      <AccountNav />
      <div className="w-full h-full mt-2 bg-[#262626]">
        <div className="px-4 py-6 mr-4 ml-4">
          <form onSubmit={savePlace} className="px-4 py-4 mt-10 mr-4 ml-4 bg-white rounded-lg border-2 border-spacing-1 border-gray-500">
            {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
            <input type="text" className="border px-4 rounded-2xl w-full max-w-96" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apt" />
            {preInput('Address', 'Address to this place')}
            <input type="text" value={address} className="border px-4 rounded-2xl w-full max-w-96" onChange={ev => setAddress(ev.target.value)} placeholder="address" />
            {preInput('Photos', 'more = better')}
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
            {preInput('Description', 'description of the place')}
            <textarea value={description} className="border px-4 rounded-2xl w-full max-w-96" onChange={ev => setDescription(ev.target.value)} />
            {preInput('Perks', 'select all the perks of your place')}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            {preInput('Extra info', 'house rules, etc')}
            <textarea value={extraInfo} className="border px-4 rounded-2xl w-full max-w-96" onChange={ev => setExtraInfo(ev.target.value)} />
            {preInput('Check in&out times', 'add check in and out times, remember to have some time window for cleaning the room between guests')}
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
              <div className="border px-4 rounded-2xl w-full max-w-32">
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input type="text"
                  value={checkIn}
                  onChange={ev => setCheckIn(ev.target.value)}
                  placeholder="14" />
              </div>
              <div className="border px-4 rounded-2xl w-full max-w-32">
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input type="text"
                  value={checkOut}
                  onChange={ev => setCheckOut(ev.target.value)}
                  placeholder="11" />
              </div>
              <div className="border px-4 rounded-2xl w-full max-w-32">
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input type="number" value={maxGuests}
                  onChange={ev => setMaxGuests(ev.target.value)} />
              </div>
              <div className="border px-4 rounded-2xl w-full max-w-32">
                <h3 className="mt-2 -mb-1">Price per night</h3>
                <input type="number" value={price}
                  onChange={ev => setPrice(ev.target.value)} />
              </div>
            </div>
            <div className="flex justify-center">
              <button id="submit" className={`my-4 w-full px-4 py-4 max-w-48 bg-secondary text-white rounded-full ${buttonState}`}>
                <span className="icon"><i className="fa fa-check" aria-hidden="true"></i></span>
                <span className="text">Submit</span>
                <span className="spinner">
                  <svg width="50" height="50">
                    <circle r="23" cx="25" cy="25" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
