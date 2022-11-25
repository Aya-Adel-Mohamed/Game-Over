import './App.css';
import { createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom';
import MainLayout from './Components/MainLayout/MainLayout.jsx';
import Home from './Components/Home/Home.jsx';
import Register from './Components/Register/Register.jsx';
import Login from './Components/Login/Login.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import All from './Components/All/All.jsx';
import PlatformsPc from './Components/PlatformsPc/PlatformsPc.jsx';
import SortRelease from './Components/SortRelease/SortRelease.jsx';
import PlatformsBrowser from './Components/PlatformsBrowser/PlatformsBrowser';
import {useEffect,useState} from 'react';
import jwt_decode from 'jwt-decode';
import SortPopularity from './Components/SortPopularity/SortPopularity';
import SortAlphabetical from './Components/SortAlphabetical/SortAlphabetical';
import SortRelevance from './Components/SortRelevance/SortRelevance';
import CatRacing from './Components/CatRacing/CatRacing.jsx';
import CatSports from './Components/CatSports/CatSports.jsx';
import CatSocial from './Components/CatSocial/CatSocial.jsx';
import CatShooter from './Components/CatShooter/CatShooter.jsx';
import CatOpenWorld from './Components/CatOpenWorld/CatOpenWorld.jsx';
import CatZombie from './Components/CatZombie/CatZombie.jsx';
import CatFantasy from './Components/CatFantasy/CatFantasy.jsx';
import CatActionRpg from './Components/CatActionRpg/CatActionRpg.jsx';
import CatAction from './Components/CatAction/CatAction.jsx';
import CatFlight from './Components/CatFlight/CatFlight.jsx';
import CatBattleRoyale from './Components/CatBattleRoyale/CatBattleRoyale.jsx';
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
      return <Navigate to='/login'/>
    }
  }
  function logOut(){
    localStorage.removeItem('token');
    setUserData(null);
    return <Navigate to='/login'/>
  }
  
  const routers = createBrowserRouter([
    {path:'/',element: <MainLayout userData={userData} logOut={logOut}/>, children:[
      {index:true ,element:<ProtectedRoute><Home /></ProtectedRoute>},
      {path:'register',element:<Register />},
      {path: 'login' ,element:<Login saveUser={saveUser}/>},
      {path:'all',element:<ProtectedRoute><All/></ProtectedRoute>},
      {path:'platforms/pc',element:<ProtectedRoute><PlatformsPc/></ProtectedRoute>},
      {path:'platforms/browser',element:<ProtectedRoute><PlatformsBrowser/></ProtectedRoute>},
      {path:'sort-by/release-date',element:<ProtectedRoute><SortRelease/></ProtectedRoute>},
      {path:'sort-by/popularity',element:<ProtectedRoute><SortPopularity/></ProtectedRoute>},
      {path:'sort-by/alphabetical',element:<ProtectedRoute><SortAlphabetical/></ProtectedRoute>},
      {path:'sort-by/relevance',element:<ProtectedRoute><SortRelevance/></ProtectedRoute>},
      {path:'categories/racing',element:<ProtectedRoute><CatRacing/></ProtectedRoute>},
      {path:'categories/sports',element:<ProtectedRoute><CatSports/></ProtectedRoute>},
      {path:'categories/social',element:<ProtectedRoute><CatSocial/></ProtectedRoute>},
      {path:'categories/shooter',element:<ProtectedRoute><CatShooter/></ProtectedRoute>},
      {path:'categories/open-world',element:<ProtectedRoute><CatOpenWorld/></ProtectedRoute>},
      {path:'categories/zombie',element:<ProtectedRoute><CatZombie/></ProtectedRoute>},
      {path:'categories/fantasy',element:<ProtectedRoute><CatFantasy/></ProtectedRoute>},
      {path:'categories/action-rpg',element:<ProtectedRoute><CatActionRpg/></ProtectedRoute>},
      {path:'categories/action',element:<ProtectedRoute><CatAction/></ProtectedRoute>},
      {path:'categories/flight',element:<ProtectedRoute><CatFlight/></ProtectedRoute>},
      {path:'categories/battle-royale',element:<ProtectedRoute><CatBattleRoyale/></ProtectedRoute>},
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