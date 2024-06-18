import React from 'react';

const AddressCard = ({ address }) => {
  // Generate the Google Maps embed URL
  const embedMapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(address)}`;

  // Generate the dynamic map URL
  const dynamicMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className=" text-black rounded-lg p-6 mt-4 mb-6 shadow-lg">
      <h2 className="font-semibold text-2xl mb-4 text-center">Where you'll be</h2>
      <div className="flex justify-center items-center gap-2 mb-4">
        <div className="flex flex-col items-center">
          <p className="mb-2">Click on the map below to view the location</p>
          <a href={dynamicMapUrl} target="_blank" rel="noopener noreferrer">
          <img
              src={'https://t3.ftcdn.net/jpg/04/49/73/64/360_F_449736488_IAGo58o7DloC8Os5S5v9vppX3BIxzK4S.jpg'}
              alt="Map location"
              width="600"
              height="300"
              className="rounded-lg shadow-md"
              style={{ display: 'block' }}
            />
          </a>
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg">{address}</p>
      </div>
    </div>
  );
};

export default AddressCard;
