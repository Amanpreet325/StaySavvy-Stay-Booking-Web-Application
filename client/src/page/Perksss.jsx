import React from 'react';

export default function Perksss({ perks }) {
  const perkIcons = {
    wifi: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#8A2BE2" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
      </svg>
    ),
    parking: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#8A2BE2" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    TV: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#8A2BE2" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    ),
    pets: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#8A2BE2" className="w-6 h-6">
        <path d="M464 80a16 16 0 1 0 -32 0 16 16 0 1 0 32 0z"/>
      </svg>
    )
  };

  return (
    <>
      <h2 className="font-semibold text-2xl">Perks</h2>
      <div className="grid grid-cols-6 gap-1 mt-4">
        {perks.map((perk, index) => (
          <div key={index} className="bg-white text-black px-2 py-2 rounded-lg shadow-lg cursor-pointer transition duration-300 transform hover:shadow-xl hover:bg-purple-50 flex items-center justify-center">
            {perkIcons[perk]}
            <div className="text-center ml-1">{perk}</div>
          </div>
        ))}
      </div>
    </>
  );
}
