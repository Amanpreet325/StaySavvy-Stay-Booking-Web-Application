import React, { useEffect, useState } from 'react';
import purp from './assets/purp.webp';

import { Navigation, Pagination } from 'swiper/modules'; // import Swiper and modules styles

import DatePicker from 'react-date-picker'; // Import date picker library
 // Import date picker styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import for icons
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Import specific icon



export default function SearchPage() {
  
  const [selectedFilter, setSelectedFilter] = useState(''); // For filtering options (optional)
  const [startDate, setStartDate] = useState(null); // State to store selected start date
  const [endDate, setEndDate] = useState(null); // State to store selected end date

 

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleSearch = () => {
    // Implement search logic here based on selected filter, dates, etc.
    // You can filter the `places` array or fetch new data from the backend.

    console.log('Search triggered!', {
      selectedFilter,
      startDate,
      endDate,
    }); // Log search parameters for debugging
  };

  return (
    
    <div className='flex mt-0 justify-center h-48 min-w-screen bg-white  items-center'>
    <div className="flex bg-white h-25 w-4/5 items-center gap-3 justify-between border-gray-500 border-[1.5px] rounded-full px-4 py-2 shadow-md shadow-gray-300">
              <div className="nav-item w-2/3 ">WHERE TO ? 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgb(147, 51, 234)" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
            </svg>
                
              </div>
              
              <div className="nav-item w-1/5">Check in :  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgb(147, 51, 234)" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
</svg>
</div>
              <div className="text-gray-800 hover:text-white mr-4">|</div>
              <div className="nav-item w-1/5">Check out : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgb(147, 51, 234)" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
</svg>
 </div>
              <span className="bg-primary text-white border-white rounded-full p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </span>
            </div>
            </div>
      )
      }

