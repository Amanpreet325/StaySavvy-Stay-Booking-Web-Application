import React, { useEffect, useState } from 'react';
import axios from 'axios';
import airlogo from '../assets/airbnb.svg'; // Ensure this path is correct
import Header from '../Header'; // Ensure this path is correct
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import for icons
// Import specific icons

import SwiperCore from 'swiper';
import { Link } from 'react-router-dom';
import SearchPage from '../SearchPage';


SwiperCore.use([Navigation, Pagination]);

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 px-4 mt-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/4 mb-4 md:mb-0">
                        <h2 className="text-xl mb-4">About StaySavvy</h2>
                        <p className="text-left text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas venenatis tincidunt rhoncus.</p>
                    </div>
                    <div className="w-full md:w-1/4 mb-4 md:mb-0">
                        <h2 className="text-xl mb-4">Contact Us</h2>
                        <p className="text-gray-400 text-left">Email: contact@staysavvy.com</p>
                        <p className="text-gray-400 text-left">Phone: +123 456 7890</p>
                    </div>
                    <div className="w-full md:w-1/4 mb-4 md:mb-0">
                        <h2 className="text-xl mb-4">Quick Links</h2>
                        <ul>
                            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/4 mb-4 md:mb-0">
                        <h2 className="text-xl mb-4">Follow Us</h2>
                        <div className="flex space-x-4">
                            <a href="#" className="text-white hover:text-white">
                                <FontAwesomeIcon icon={['fab', 'facebook']} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <FontAwesomeIcon icon={['fab', 'twitter']} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-4 text-center">
                    <p className="text-gray-400">&copy; 2024 StaySavvy. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('');

    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data);
        });
    }, []);

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    return (
        <>
            <SearchPage />
            <div className="bg-gray-100 min-h-screen text-gray-900 p-4">
                <div className="flex justify-center items-center mb-8">
                    <div className='flex justify-center items-center p-4 rounded-full text-black bg-white border border-purple-700'>
                        <span
                            className={`mr-4 px-4 py-2 rounded-md hover:bg-gray-200 cursor-pointer ${selectedFilter === 'farm' ? 'bg-indigo-500 text-white' : ''}`}
                            onClick={() => handleFilterChange('farm')}
                        >
                            Farms
                        </span>
                        <span
                            className={`mr-4 px-4 py-2 rounded-md hover:bg-gray-200 cursor-pointer ${selectedFilter === 'pool' ? 'bg-indigo-500 text-white' : ''}`}
                            onClick={() => handleFilterChange('pool')}
                        >
                            Pools
                        </span>
                        <span
                            className={`mr-4 px-4 py-2 rounded-md hover:bg-gray-200 cursor-pointer ${selectedFilter === 'rent' ? 'bg-indigo-500 text-white' : ''}`}
                            onClick={() => handleFilterChange('rent')}
                        >
                            Rent
                        </span>
                        <span
                            className={`mr-4 px-4 py-2 rounded-md hover:bg-gray-200 cursor-pointer ${selectedFilter === 'resort' ? 'bg-indigo-500 text-white' : ''}`}
                            onClick={() => handleFilterChange('resort')}
                        >
                            Resorts
                        </span>
                        <span
                            className={`mr-4 px-4 py-2 rounded-md hover:bg-gray-200 cursor-pointer ${selectedFilter === 'hotel' ? 'bg-indigo-500 text-white' : ''}`}
                            onClick={() => handleFilterChange('hotel')}
                        >
                            Hotels
                        </span>
                        <span
                            className={`px-4 py-2 rounded-md hover:bg-gray-200 cursor-pointer ${selectedFilter === 'villa' ? 'bg-indigo-500 text-white' : ''}`}
                            onClick={() => handleFilterChange('villa')}
                        >
                            Villas
                        </span>
                    </div>
                </div>
                <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-5 lg:grid-cols-5">
                    {places.length > 0 && places.map(place => (
                        <Link to={'places/' + place._id} key={place._id}>
                            <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                                <Swiper
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    navigation
                                    pagination={{ clickable: true }}
                                    className="h-64"
                                >
                                    {place.photos.map((photo, index) => (
                                        <SwiperSlide key={index}>
                                            <img src={'http://localhost:3000/uploads/' + photo} alt={place.title} className="rounded-lg w-full h-full object-cover" />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div className="p-4">
                                    <h2 className="text-xl mb-2">{place.title}</h2>
                                    <p className="text-gray-600 mb-2">{place.address}</p>
                                    <p className="text-lg mb-2">${place.price} per night</p>
                                    <p className="text-gray-600">Max Guests: {place.maxGuests}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
