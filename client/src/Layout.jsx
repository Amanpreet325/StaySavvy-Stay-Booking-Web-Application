import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    
    <>
      <Header />
      <Outlet />
      </>
    
  );
}