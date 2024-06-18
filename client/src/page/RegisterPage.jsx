import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import axios from 'axios';

export default function RegisterPage() {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  function registerUser(ev){
    ev.preventDefault();
    try {
      axios.post('/register',{
        name,
        email,
        password,
      });
      alert('Registration Successful ');
  
    
    } catch (e) {
      alert('Registration not successful ,check your details');
    }
      } 
    return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-indigo-600">Register</h2>
        <form className="space-y-4" onSubmit={registerUser}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              <FaUser className="inline-block mr-2" />
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name} onChange={ev=>setName(ev.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              <FaEnvelope className="inline-block mr-2" />
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email} onChange={ev=>setEmail(ev.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              <FaLock className="inline-block mr-2" />
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password} onChange={ev=>setPassword(ev.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
