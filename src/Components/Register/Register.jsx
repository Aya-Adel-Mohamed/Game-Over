import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import '../Register/Register.css';
import { Link } from 'react-router-dom';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  let [user,setUser] = useState({
    first_name:"",
    last_name:"",
    email:"",
    age:0,
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
    async function register(e){
      e.preventDefault();
      if(validateUser()){
        setIsLoading(true)
  let {data} = await axios.post('https://route-movies-api.vercel.app/signup',user);
  console.log(data)
  if(data.message =="success"){
  navigate('/Game-Over')
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
        first_name:Joi.string().min(3).max(20).required().messages({
          "string.empty":"First name is required",
          "string.min":"First Name length must be between 3 to 20 character",
          "string.max":"Special chars not allowed",
        }),
        last_name: Joi.string().min(3).max(20).required().messages({
          "string.empty":"Last name is required",
          "string.min":"Last Name length must be between 3 to 20 character",
          "string.max":"Special chars not allowed",
        }),
        email:Joi.string().email({minDomainSegments:2,tlds:{allow:false}}).messages({
          "string.empty":"Email is reqired",
        }),
        password:Joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)).messages({
          "string.empty":"Password is required",
          "string.pattern.base":"Invalid Password",
        }),
        age:Joi.number().min(1).max(100).required().messages({
          "number.min":"Age must be between 1 to 100",
          "number.max":"Age must be between 1 to 100",
        })
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
    <section className=' my-5 pt-5'>
    <div className="container pt-5 mt-1">
      <div className="row bg-color ">
        <div className="col-lg-6 d-none d-lg-block img-bg"></div>
        <div className="col-lg-6 py-5 px-4">
          <div className="Register-content text-center">
            <h1 className='Register-h1 mb-4 pb-2'>Create My Account!</h1>
            {apiError && <div className='alert alert-warning'>{apiError}</div>}
            <form onSubmit={(e)=>register(e)}>
            <div className="form-group row">
              <div className="col-md-6">
              <input type="text" onChange={(e)=>getUserData(e) }id="first_name" className='form-control dark text-white p-2' name="first_name" placeholder='First Name' />
              <p className={validationError.filter(ele => ele.context.label =="first_name")[0]?"mt-1 alert alert-warning py-0 text-start fs-6":null}>{validationError.filter(ele => ele.context.label =="first_name")[0]?.message}</p>
              </div>
              <div className="col-md-6">
              <input type="text" onChange={(e)=>getUserData(e) }id="last_name" className="form-control dark text-white p-2"name="last_name" placeholder='Last Name' />
              <p className={validationError.filter(ele => ele.context.label =="last_name")[0]?"mt-1 alert alert-warning py-0 text-start fs-6":null}>{validationError.filter(ele => ele.context.label =="last_name")[0]?.message}</p>
              </div>
            </div>
            <div className="form-group ">
              <input type="email"onChange={(e)=>getUserData(e) }id="email" className="form-control dark text-white p-2"name="email" placeholder='Email Address'/>
              <p className={validationError.filter(ele => ele.context.label =="email")[0]?"mt-1 alert alert-warning py-0 text-start fs-6":null}>{validationError.filter(ele => ele.context.label =="email")[0]?.message}</p>
            </div>
            <div className="form-group ">
              <input type="number"  onChange={(e)=>getUserData(e) } id="age" className="form-control dark text-white p-2" name="age" placeholder='age' />
              <p className={validationError.filter(ele => ele.context.label =="age")[0]?"mt-1 alert alert-warning py-0 text-start fs-6":null}>{validationError.filter(ele => ele.context.label =="age")[0]?.message}</p>
            </div>
            <div className="form-group ">
              <input type="password"  onChange={(e)=>getUserData(e) } id="password" className="form-control dark text-white p-2" name="password" placeholder='password' />
              <p className={validationError.filter(ele => ele.context.label =="password")[0]?"mt-1 alert alert-warning py-0 text-start fs-6":null}>{validationError.filter(ele => ele.context.label =="password")[0]?.message}</p>
            </div>
            <button className='btn w-100 btn-primary fs-6'>
            {isLoading?<i className='fa fa-spinner fa-spin'></i>:"Create Account"}
            </button>
            </form>
            <div  className="text-center mb-2 mt-3">
            <div className="text-muted paragraph">This site is protected by reCAPTCHA and the Google 
            <a  href="https://policies.google.com/privacy" target={'_blank'} rel="noreferrer" className="text-secondary">Privacy Policy</a> and <a href="https://policies.google.com/terms" target={'_blank'} rel="noreferrer" className="text-secondary">Terms of Service</a> apply.</div>
            </div><hr/>
            <div className="text-center mb-2 pt-2"><span class="text-white-50">Already a member?</span><Link  to="/Game-Over" className="text-decoration-none maincolor ms-2">
            Log In 
            <i className="fas fa-chevron-right"></i></Link></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
  )
}
