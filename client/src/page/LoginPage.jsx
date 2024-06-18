import React, { useContext, useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, Navigate, redirect } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";
import loginbg from '../assets/loginbg.jpg';


export default function LoginPage() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false);

  const {setUser}=useContext(UserContext);
  async function handleLogin(ev){
    ev.preventDefault();
    try{
      const {data}=await axios.post('/login',{email,password});
      setUser(data);
      console.log(data);
      alert('Login Successful');
      setRedirect(true);
    }
    catch(e){
      alert('Login Failed')
    }
  }
  if(redirect){
    return <Navigate to={'/'}/>
  }
  return (
    <div 
      className="min-h-screen flex justify-center items-center bg-cover bg-center" 
      style={{ backgroundImage: `url(${loginbg})` }}
    >
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-primary">Welcome Back!</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={email} onChange={ev=>setEmail(ev.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password} onChange={ev=>setPassword(ev.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Or sign in with</p>
            <div className="flex justify-center">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mr-2">
                <FaFacebook className="w-6 h-6" />
              </button>
              <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                <FaGoogle className="w-6 h-6" />
              </button>
            </div>
          </div>
        </form>
        <div className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <Link to={'/register'} className="text-primary hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
