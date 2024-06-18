import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function AccountNav(){
    const {pathname}=useLocation();
    let subpage=pathname.split('/')?.[2];
    if(subpage===undefined){
        subpage='profile';
    }
    function LinkClasses(type=null){
        let classes='inline-flex gap-1 py-2 px-6';
        if(type===subpage){
            classes+=' bg-secondary text-white rounded-full';}
            else{
                classes+='bg-gray-200';
            }
            return classes;
    }
    return(
        <>
        
        <nav className="w-full flex justify-center mt-8 gap-4">
            <Link className={LinkClasses('profile')} to={'/account/profile'}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
My Profile</Link>
            <Link className={LinkClasses('bookings')} to={'/account/bookings'}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
</svg>
My Bookings</Link>
            <Link className={LinkClasses('places')} to={'/account/places'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
</svg>
My Accomodations</Link>
        </nav>
       
        </>
    );

}