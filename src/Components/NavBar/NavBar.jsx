import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo.png';
import '../NavBar/NavBar.css';


export default function NavBar(props) {
  
  let {userData, logOut} = props;
  let platforms =[
    {platform:'pc',title:'pc'},
    {platform:'browser',title:'browser'},
  ]
  let sortBy=[
    {sort:'release-date',title:'release-date'},
    {sort:'popularity',title:'popularity'},
    {sort:'alphabetical',title:'alphabetical'},
    {sort:'relevance',title:'relevance'},
  ]
  let categories=[
    {cat:'racing',title:'racing'},
    {cat:'sports',title:'sports'},
    {cat:'social',title:'social'},
    {cat:'shooter',title:'shooter'},
    {cat:'open-world',title:'open-world'},
    {cat:'zombie',title:'zombie'},
    {cat:'fantasy',title:'fantasy'},
    {cat:'action-rpg',title:'action-rpg'},
    {cat:'action',title:'action'},
    {cat:'flight',title:'flight'},
    {cat:'battle-royale',title:'battle-royale'},
  ]
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark p-3 shadow-sm fixed-top">
  <div className="container-fluid mx-xl-4 mx-0">
    <Link className="navbar-brand px-xl-5 px-0 me-5 fs-4" to=""><img src={logo} className='ms-xl-5 ms-0' alt=''/>Game Over</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {userData?<>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
        <li className="nav-item me-2">
          <Link className="nav-link active" aria-current="page" to="">Home</Link>
        </li>
        <li className="nav-item me-2">
          <Link className="nav-link" to='all'>All</Link>
        </li>
        <li className="nav-item dropdown me-2">
          <Link className="nav-link dropdown-toggle" to="platforms" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Platforms
          </Link>
          <ul className="dropdown-menu">
            {platforms.map((platform,index)=><li key={index}><Link className="dropdown-item" to={`platforms/`+platform.platform}>{platform.title}</Link></li>)}
          </ul>
        </li>
        <li className="nav-item dropdown me-2">
          <Link className="nav-link dropdown-toggle" to="sort-by" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            sort-by
          </Link>
          <ul className="dropdown-menu">
            {sortBy.map((sort,index)=><li key={index}><Link className="dropdown-item" to={`sort-by/`+sort.sort}>{sort.title}</Link></li>)}
          </ul>
        </li>
        <li className="nav-item dropdown me-2">
          <Link className="nav-link dropdown-toggle" to="categories" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Categories
          </Link>
          <ul className="dropdown-menu">
          {categories.map((cat,index)=><li key={index}><Link className="dropdown-item" to={`categories/`+cat.cat}>{cat.title}</Link></li>)}
          </ul>
        </li>
      </ul>
      </>:""}
      <ul className="navbar-nav mb-2 mb-lg-0 pe-5 ms-auto">
      {userData?<>
        <li className="nav-item pe-5">
        <span className="nav-link rounded-2 bordercolor px-3 py-2 btn-inline" onClick={logOut}>Log Out</span>
        </li>
      </>:<>
      <li className="nav-item">
        <Link className="nav-link me-3 navbord btn-inline px-3 py-2 mb-2 mb-lg-0" to='login'>Login</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link rounded-2 bordercolor me-5 px-3 py-2 btn-inline " to='register'>Join Free</Link>
        </li>
      </>}
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}
