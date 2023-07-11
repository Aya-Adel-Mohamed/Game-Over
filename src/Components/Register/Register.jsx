import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import '../Register/Register.css';
import { Link } from 'react-router-dom';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  let [user, setUser] = useState({
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:""
})
let [validationError, setValidationError] = useState([]);
let [apiError, setApiError] = useState(null);
let [isLoading, setIsLoading] = useState(false);
let navigate = useNavigate();

function getUserData(e) {
  let currentUser = { ...user };
  currentUser[e.target.name] = e.target.value;
  setUser(currentUser)
}

useEffect(() => {

}, [user]);
    async function register(e){
      e.preventDefault();
      if(validateUser()){
        setIsLoading(true)
  let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',user);
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
    function validateUser() {
      let schema = Joi.object({
          name: Joi.string().min(3).max(10).required().messages({
              "string.empty": "first name is required",
              "string.min": "you have to enter more than 3 characters"
          }),
          email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).messages({
              "string.empty":"email is required"
          }),
          password: Joi.string().pattern(new RegExp(/^[A-Za-z0-9]{3,8}$/)).messages({
              "string.empty":"password is required",
              "string.pattern.base": "password must contain more than 3 characters or numbers "
          }),
          rePassword: Joi.ref('password'),
          phone: Joi.number().min(16).max(35).required().messages({
              "number.min":"age must be greater than or equal to 16"
          }),
          phone:Joi.string().regex(/^[0-9]{11}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required()
      });

      let validations = schema.validate(user, { abortEarly: false });
      if (validations.error) {
          setValidationError(validations.error.details);
          return false
      } else {
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
            <form onSubmit={(e) => register(e)}>
                            <div className="form-group mb-3">
                                <label htmlFor="name">First Name</label>
                                <input onChange={(e) => getUserData(e)} type="text" id="name" className= {validationError.filter(ele => ele.context.label == "name")[0]?.message? "form-control is-invalid ":"form-control"} name="name" />
                                <div className="text-danger">
                                {validationError.filter(ele => ele.context.label == "name")[0]?.message}
                                </div>
                            </div>
                          
                            <div className="form-group mb-3">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" onChange={(e) => getUserData(e)} className= {validationError.filter(ele => ele.context.label == "email")[0]?.message? "form-control is-invalid ":"form-control"} name="email" />
                                <div className="text-danger">
                                {validationError.filter(ele => ele.context.label == "email")[0]?.message}
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" onChange={(e) => getUserData(e)} className= {validationError.filter(ele => ele.context.label == "password")[0]?.message? "form-control is-invalid ":"form-control"} name="password" />
                               <div className="text-danger">
                               {validationError.filter(ele => ele.context.label == "password")[0]?.message}
                               </div>
                            </div>
                         
                            <div className="form-group mb-3">
                                <label htmlFor="rePassword">rePassword</label>
                                <input type="password" id="rePassword" onChange={(e) => getUserData(e)} className= {validationError.filter(ele => ele.context.label == "rePassword")[0]?.message? "form-control is-invalid ":"form-control"} name="rePassword" />
                               <div className="text-danger">
                               {validationError.filter(ele => ele.context.label == "rePassword")[0]?.message}
                               </div>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="phone">Phone</label>
                                <input type="tel" id="phone" onChange={(e) => getUserData(e)} className= {validationError.filter(ele => ele.context.label == "phone")[0]?.message? "form-control is-invalid ":"form-control"} name="phone" />
                               <div className="text-danger">
                               {validationError.filter(ele => ele.context.label == "phone")[0]?.message}
                               </div>
                            </div>
                            
                            <button className="btn btn-info d-flex ms-auto  btn-bg ">
                                {isLoading?<i className="fa fa-spinner fa-spin"></i>:"Sign Up"}
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
