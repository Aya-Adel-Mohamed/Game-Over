import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DisplayData from '../DisplayData/DisplayData';
import Loading from '../Loading/Loading';

export default function Category() {
let[ data , setData ]=useState(null);
let[ error, setError ]=useState(null);
let [ isLoading , setIsLoading ]=useState(true);
let[ params , setParams ]=useState(null);
const [ paginate , setPaginate ]=useState(20);
let Params = useParams();
  
async function getData(){
  return await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games',{
  params: {category: Params.cat},
  headers: {
    'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    },
  })
}
  
useEffect(()=>{
setParams(Params)
setIsLoading(true);
setData(null)
getData().then(res=>{
console.log(res.data)
setData(res.data)
setIsLoading(false);
setError(null);
}).catch(err=>{
setIsLoading(false);
setError(err);
});
},[Params]);
  
const load_more= (e)=>{
  setPaginate(( prevValue )=>prevValue + 20 );
}
return (
  <>
  { isLoading &&<Loading/> }
  { error && <div>Error</div> }
  { data && <>
  <div className="all mt-5 mx-5 pt-5">
    <div className="container px-0 pt-5">
      <div className="row">
      { data?.slice(0,paginate).map((all)=><DisplayData key={ all.id } data={ all }/>)}
      </div>
      { data? <button onClick={ load_more } className='btn btn-outline-secondary mx-auto d-flex py-2 px-3 fs-6 my-3'>More Games <i className="ms-1 fas fa-chevron-right "></i></button>:null}
    </div>
    </div>
  </>}
</>
  )
}