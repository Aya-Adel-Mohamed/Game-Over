import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

export default function MainLayout({userData,logOut}) {
  
  return (
    <>
    <NavBar userData={userData} logOut={logOut}/>
    <Outlet></Outlet>
    </>
    
  )
}
