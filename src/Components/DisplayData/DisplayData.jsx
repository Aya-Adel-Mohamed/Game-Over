import React from 'react';
import {Link} from 'react-router-dom';

export default function DisplayData({data}) {
  return (
    <>
    <div className="col-xl-3 col-lg-4 col-md-6 px-0 px-md-2 ">
    <Link to={'/gameDetails/'+ data.id} className='text-decoration-none'>
    <div className="shadow scale">
        <div className="image-card">
          <img src={data.thumbnail}alt="" className='w-100'/>
          </div>
         <div className="body-card p-3 bg-color">
         <div className="content-card d-flex justify-content-between align-items-center">
            <h3 className='title-card title-font'>{data.title}</h3>
            <span className='badge bg-badge ms-1'>FREE</span>
          </div>
          <p className='text-muted p-card '>{data.short_description}</p>
          <div className="d-flex justify-content-between">
            <i className="fas fa-plus-square "></i>
            <div  className="d-flex justify-content-between align-items-center mt-1">
              <span className="badge bg-secondary rounded-5 text-dark font me-2 ">{data.genre}</span>
              {data.platform=="PC (Windows)"? <i className="fab fa-windows text-muted"></i>: <i className="fas fa-window-maximize text-muted "></i>}
             
            </div>
          </div>
         </div>
        </div>
    </Link>
  </div>
    </>
  )
}
