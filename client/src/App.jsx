import React from 'react';
//placespage-myplaces
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './page/IndexPage.jsx';
import LoginPage from './page/LoginPage.jsx';
import RegisterPage from './page/RegisterPage.jsx';
import axios from 'axios';
import { UserContextProvider } from './UserContext';

import ProfilePage from './page/ProfilePage.jsx';
import MyPlaces from './page/MyPlaces.jsx';
import PlacesFormPage from './page/PlacesFormPage.jsx';
import Layout from './Layout.jsx';
import PlacePage from './page/PlacePage.jsx';
import BookingsPage from './page/BookingsPage.jsx';
import BookingPage from './BookingPage.jsx';
import About from './About.jsx';
axios.defaults.baseURL='http://localhost:3000';
axios.defaults.withCredentials=true;

function App() {

  return (
    <UserContextProvider>
    <Router>
    <Routes>
    <Route path='/' element={<Layout/>}>
      <Route index element={<IndexPage />} />

      <Route path='/about' element={<About/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/account' element={<ProfilePage/>}/>
      <Route path='/account/places' element={<MyPlaces/>}/>
      <Route path='/account/places/new' element={<PlacesFormPage/>}/>
      <Route path="/account/places/:id" element={<PlacesFormPage />} />
      <Route path="/places/:id" element={<PlacePage />} />
      <Route path="/account/bookings" element={<BookingsPage />} />
      <Route path="/account/bookings/:id" element={<BookingPage />} />
      <Route path="/account/profile" element={<ProfilePage />} />


    </Route> 
    </Routes>
  </Router>
  </UserContextProvider>
    
  )
}

export default App;
