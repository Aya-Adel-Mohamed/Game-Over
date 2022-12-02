import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import DisplayData from '../DisplayData/DisplayData';
import Loading from '../Loading/Loading.jsx';

export default function All() {
let { data , isLoading , error }=useFetch();
const [ paginate , setPaginate ]=useState(20);
const load_more= (e)=>{
  setPaginate(( prevValue )=> prevValue + 20 );
}
 
return (
  <>
  { isLoading && <Loading/> }
  { error && <div>Error</div> }
  <div className="all mt-5 mx-5 pt-5">
  <div className="container pt-5">
    <div className="row">
      {data?.slice(0,paginate).map((all)=><DisplayData key={ all.id } data={ all }/>)}
    </div>
      {data? <button onClick={ load_more } className='btn btn-outline-secondary mx-auto d-flex py-2 px-3 fs-6 my-3'>More Games <i className="ms-1 fas fa-chevron-right "></i></button>:null}
    </div>
  </div>
</>
  )
}