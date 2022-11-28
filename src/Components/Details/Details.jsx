import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from 'react-router-dom';
import { useEffect, useState} from 'react';
import axios from 'axios';
import '../Details/Details.css';
import Loading from '../Loading/Loading';

export default function Details() {
let Params = useParams();
let[data,setData]=useState(null);
let[error,setError]=useState(null);
let [isLoading,setIsLoading]=useState(true);

async function getDataDetails(){
  return await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/game',{
  params: Params,
  headers: {
    'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  })
}
  
useEffect(()=>{
getDataDetails().then(res=>{
console.log(res.data)
setData(res.data)
setIsLoading(false);
setError(null);
}).catch(err=>{
setIsLoading(false);
setError(err);
})
},[])
 
return (
  <>
  {isLoading && <Loading/>}
  {error && <div>Error</div>}
  {data?<><div className="container-fluid py-5 px-xl-5 px-0 ">
    <div className="row px-xl-5 px-0 mx-5 pt-5 mt-5">
      <div className="col-md-4 px-0">
        <div className="image-game">
          <img src={data?.thumbnail} className='w-100 rounded-3' alt="" />
        </div>
        <div className="row">
        <div className="col-3 col-lg-2">
        <div className="btn btncolor">FREE</div>
        </div>
        <div class="col ms-2"><a type="button" target="_blank" rel="noreferrer"className="btn btn-danger w-100 me-0 properties" href={data?.freetogame_profile_url}><strong>PLAY NOW </strong><i class="fas fa-sign-out-alt"></i></a></div>
        </div>
      </div>
      <div className="col-md-8 ps-md-4 ps-0">
        <h1 className='title-fonts'>{data?.title}</h1>
        <h5 className='ps-1 secondary-color mt-3'>{`About `+data?.title}</h5>
        <p className='paragraph-fonts'>{data?.description}</p>
        {data?.minimum_system_requirements?<>
          <h5 className='mt-3 secondary-color'>Minimum System Requirements</h5>
        <ul className='list-unstyled ms-2'>
          <li className='paragraph-font'><strong>graphics : </strong>{data?.minimum_system_requirements?.graphics}</li>
          <li className='paragraph-font'><strong>memory : </strong>{data?.minimum_system_requirements?.memory}</li>
          <li className='paragraph-font'><strong>os : </strong>{data?.minimum_system_requirements?.os}</li>
          <li className='paragraph-font'><strong>processor : </strong>{data?.minimum_system_requirements?.processor}</li>
          <li className='paragraph-font'><strong>storage : </strong>{data?.minimum_system_requirements?.storage}</li>
        </ul>
        </>:null}
        <h4 className='mt-3 overwatch mb-3'>Overwatch 2 Screenshots</h4>
        <Carousel controls={false} indicators={false}>
            {data?.screenshots?.map(screenshot=> <Carousel.Item key={screenshot.id}> <img src={screenshot?.image}className='d-block w-100'al=''/> </Carousel.Item>)}
        </Carousel>
        <h2 className='mt-3 info mb-4'>Additional Information</h2>
        <div className="row gy-2">
          <div className="col-6 col-md-4">
            <span className='text-muted fs-5'>Title</span><br/><p className='font-parg'>{data.title}</p>
          </div>
          <div className="col-6 col-md-4">
            <span className='text-muted fs-5'>Developer</span><br/><p className='font-parg'>{data.developer}</p>
          </div>
          <div className="col-6 col-md-4">
            <span className='text-muted fs-5'>Publisher</span><br/><p className='font-parg'>{data.publisher}</p>
          </div>
          <div className="col-6 col-md-4">
            <span className='text-muted fs-5'>Release Date</span><br/><p className='font-parg'>{data.release_date}</p>
          </div>
          <div className="col-6 col-md-4">
            <span className='text-muted fs-5'>Genre</span><br/><p className='font-parg'>{data.genre}</p>
          </div>
          <div className="col-6 col-md-4">
            <span className='text-muted fs-5'>Platform</span><br/> <p className='font-parg'>{data.platform=="Windows"? <i className="fab fa-windows font-parg me-2"></i>: <i className="fas fa-window-maximize me-2"></i>}{data.platform}</p>
          </div>
        </div>
      </div>
    </div>
  </div></>:""}
    </>
  )
}
