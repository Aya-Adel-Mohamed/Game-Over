import { useEffect, useState} from 'react';
import axios from 'axios';
const useFetch = (list) =>{
    let[data,setData]=useState(null);
  let[error,setError]=useState(null);
  let [isLoading,setIsLoading]=useState(true);
  
  async function getData(){
    return await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games',{
    params: list,
      headers: {
        'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      },
      
    })
   
  }
  useEffect(()=>{
getData().then(res=>{
  console.log(res.data)
  setData(res.data)
  setIsLoading(false);
  setError(null);
}).catch(err=>{
  setIsLoading(false);
  setError(err);
});
  },[]);

  return{
    data,
    isLoading,
    error
  }
}
export default useFetch;