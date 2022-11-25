import React from 'react';
import {Link} from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Loading from '../Loading/Loading';
import '../Home/Home.css';

export default function Home() {
  let {data,isLoading,error}=useFetch({'sort-by': 'popularity'});
  return (
    <>
    {isLoading && <Loading/>}
    {error && <div>Error</div>}
    {data?<>
      <section id='home' className='bg-header mt-5'>
      <div className="container pt-5 mt-4">
      <div className="header-content py-5 d-flex text-center flex-column justify-content-center align-items-center">
      <h1 class="heading mt-2">Find & track the best <span className='color'>free-to-play</span> games!</h1>
      <p class="lead text-muted mt-2">Track what you've played and search for what to play next! Plus get free premium loot! </p>
      <p ><Link role="button" class="btn btn-outline-secondary btn-font px-3 py-2 mb-5 ml-0" to="/all">Browse Games</Link></p>
      </div>
      </div>
    </section>
    <section className='pb-5'>
      <div className="my-3 container-fluid px-lg-5 px-3">
      <h3 className='mt-5 pt-3 px-xl-5 px-0 mx-xl-4 mx-0 Recommendations'><i class="fas fa-robot me-2"></i>Personalized Recommendations</h3>
      <div className="row mt-5 px-xl-5 px-0 mx-xl-4 mx-0">
       {data?.slice(0,3).map(ele=> <div className="col-md-4" key={ele.id}>
       <Link to={'/gameDetails/'+ ele.id} className='text-decoration-none'>
          <div className="shadow scale">
            <div className="image-card">
            <img src={ele.thumbnail} alt="" className='w-100'/>
            </div>
            <div className="body-card p-3 bg-color">
            <div className="content-card d-flex justify-content-between align-items-center mb-2 mt-1">
            <h3 className='title-card title-font'>{ele.title}</h3>
            <span className='badge bg-badge ms-1'>FREE</span>
          </div>
            </div>
          </div>
        </Link>
        </div>)}
      </div>
      </div>
    </section></>:null}
    </>
  )
}
