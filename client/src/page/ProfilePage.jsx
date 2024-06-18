import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
//placespage-myplaces
import axios from "axios";
import MyPlaces from "./MyPlaces";
import AccountNav from "../AccountNav";
export default function ProfilePage(){
  
    const [redirect,setRedirect]=useState(null);
    const {ready,user,setUser}=useContext(UserContext);
    let {subpage}=useParams();
    if(subpage===undefined){
        subpage='profile';
    }
    async function logout(){
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }


    if(!ready){
        return 'Loading...';
    }
    if(ready && !user && !redirect){
        return <Navigate to={'/login'}/>
    }
    if(redirect){
        return <Navigate to={redirect}/>
    }
    function LinkClasses(type=null){
        let classes='inline-flex gap-1 py-2 px-6';
        if(type===false){
            classes+=' bg-secondary text-white rounded-full';}
            return classes;
    }
    return(
        <>
        <AccountNav/>
        {subpage === 'profile' && (
            <div className="text-center max-w-lg mx-auto">
                Logged In as {user.name} ({user.email})<br/>
                <button onClick={logout} className="bg-primary max-w-xl px-4  text-white rounded-full mt-2">LOG OUT</button>
                </div>
        )}
        {subpage==='places' && (
            <MyPlaces/>
        )}
        </>
    );
}