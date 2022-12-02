import './App.css';
import { createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom';
import MainLayout from './Components/MainLayout/MainLayout.jsx';
import Home from './Components/Home/Home.jsx';
import Register from './Components/Register/Register.jsx';
import Login from './Components/Login/Login.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import All from './Components/All/All.jsx';
import Platforms from './Components/Platforms/Platforms.jsx';
import Sort from './Components/Sort/Sort';
import {useEffect,useState} from 'react';
import jwt_decode from 'jwt-decode';
import Category from './Components/Category/Category.jsx';
import Details from './Components/Details/Details';
function App() {
  let [userData,setUserData]= useState(null);
  function saveUser(){
   let token = localStorage.getItem("token");
   let decoded=jwt_decode(token);
   console.log(decoded);
   setUserData(decoded);
  }
  useEffect(()=>{
    if(localStorage.getItem("token")){
      saveUser()
    }
  },[]);
  function ProtectedRoute(props){
    if(localStorage.getItem('token')){
      return props.children
    }else{
      return <Navigate to='/Game-Over'/>
    }
  }
  function logOut(){
    localStorage.removeItem('token');
    setUserData(null);
    return <Navigate to='/Game-Over'/>
  }
  
  const routers = createBrowserRouter([
    {path:'/',element: <MainLayout userData={userData} logOut={logOut}/>, children:[
      {index:true ,element:<ProtectedRoute><Home /></ProtectedRoute>},
      {path:'register',element:<Register />},
      {path: 'Game-Over' ,element:<Login saveUser={saveUser}/>},
      {path:'all',element:<ProtectedRoute><All/></ProtectedRoute>},
      {path:'platforms/:platform',element:<ProtectedRoute><Platforms/></ProtectedRoute>},
      {path:'sort-by/:sort',element:<ProtectedRoute><Sort/></ProtectedRoute>},
      {path:'categories/:cat',element:<ProtectedRoute><Category/></ProtectedRoute>},
      {path:'gameDetails/:id',element:<ProtectedRoute><Details/></ProtectedRoute>},
      {path:'*',element:<NotFound/>},
    ]}
  ])
  return (
   <>
   <RouterProvider router={routers}/>
   </>
  );
}

export default App;