import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import image from '../../assets/logo.png';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import '../Login/Login.css';

export default function Login({saveUser}) {
let [user,setUser] = useState({
  email:"",
  password:"",
})
let[validationError,setValidationError]=useState([]);
let[apiError,setApiError]=useState(null);
let[isLoading,setIsLoading]=useState(false);
let navigate = useNavigate();

  function getUserData(e){
    let currentUser = {...user};
    currentUser[e.target.name] = e.target.value;
    setUser(currentUser);
  }
  useEffect(()=>{
    console.log(user);
  },[user])
  async function loginUser(e){
    e.preventDefault();
  if(validateUser()){
      setIsLoading(true)
let {data} = await axios.post('https://routeegypt.herokuapp.com/signin',user);
console.log(data)
if(data.message =="success"){
  localStorage.setItem("token",data.token);
  saveUser();
navigate('/')
setIsLoading(false);
setApiError(null)
}else{
setApiError(data.message);
setIsLoading(false);
}
    }
  
  }
  function validateUser(){
    let schema = Joi.object({
      email:Joi.string().email({minDomainSegments:2,tlds:{allow:false}}).messages({
        "string.empty":"Email doesn't exist",
      }),
      password:Joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)).messages({
        "string.empty":"Incorrect password",
        "string.pattern.base":"Invalid Password",
      }),
    });
    let validations = schema.validate(user,{abortEarly: false})
    console.log(validations)
    if(validations.error){
      setValidationError(validations.error.details);
      return false
    }else{
      return true
    }
  }
  return (
    <>
    <section className='my-5 pb-3 pt-3'>
    <div className="container py-5 ">
      <div className="row bg-color">
        <div className="col-lg-6 d-none d-lg-block img-bg"></div>
        <div className="col-lg-6 py-5 px-0 px-lg-5">
          <div className="login-content text-center px-4 pt-1">
            <img src={image} width='125px' alt="" />
            <h1 className='login-h1 mb-4 mt-3'>Log in to GameOver</h1>
            {apiError && <div className='alert alert-danger'>{apiError}</div>}
            <form onSubmit={(e)=>loginUser(e)}>
            <div className="form-group margin">
              <input type="email" id="email"  onChange={(e)=>getUserData(e) }className="p-2 form-control"name="email" placeholder='Email'/>
              <p className={validationError.filter(ele => ele.context.label =="email")[0]?"mt-1 alert alert-danger py-0 text-start fs-6":null}>{validationError.filter(ele => ele.context.label =="email")[0]?.message}</p>
            </div>
            <div className="form-group margin">
              <input type="password" id="password"onChange={(e)=>getUserData(e) }  className="p-2 form-control" name="password" placeholder='password' />
              <p className={validationError.filter(ele => ele.context.label =="password")[0]?"mt-1 alert alert-danger py-0 text-start fs-6":null}>{validationError.filter(ele => ele.context.label =="password")[0]?.message}</p>
            </div>
            <button className='btn w-100 btn-primary'>
            {isLoading?<i className='fa fa-spinner fa-spin'></i>:"Login"}
            </button>
            </form>
            <hr/>
            <div className="text text-center pt-2 mb-2"><Link  to="/Register" className="text-decoration-none maincolor ms-2">
            Forgot Password? </Link></div>
            <div className="text text-center mb-2"><span class=" text-white-50">Not a member yet?</span><Link  to="/Register" className="text-decoration-none maincolor ms-2">
            Create Account<i className="fas fa-chevron-right"></i></Link></div>
          </div>
          
        </div>
      </div>
    </div>
  </section>
    </>
  )
}
