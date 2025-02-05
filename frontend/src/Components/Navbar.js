import {React} from 'react';
import { Link} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { resetState } from '../redux/slices/userLoginSlice';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function Navbar() {
  let {isPending,currentUser,errStatus,errMessage,loginStatus}=useSelector(state=>state.userLogin)
  const dispatch=useDispatch();
  function logout(){
    sessionStorage.removeItem('token');
    //reset the state
    let actionObj=resetState();
    //dispatch this action object
    dispatch(actionObj);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }} className='bg-dark'>
      <img src="https://th.bing.com/th/id/OIP.pc7r_ENclHZW7H8GMwdbcgHaH5?rs=1&pid=ImgDetMain" alt="Logo" width="50" height="50" className="m-2" />
      <ul className="nav justify-content-end ms-auto">
      {
        loginStatus==false?<>(
        <li className="nav-item">
          <Link className="nav-link text-info" to="">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-info" to="/about">
            About Us
          </Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link text-info" to="/login">
            Signin
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-info" to="/register">
            Signup
          </Link>
        </li>
        )</>:(
          <div className='d-flex'>
<li className="nav-item">
          <Link className="nav-link text-info" to="">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-info" to="/about">
            About Us
          </Link>
        </li>
          <li className="nav-item">
          <Link className='nav-link' to="login" onClick={logout}>
      <span className="lead  fs-4 me-3 fw-1"  style={{ color: "#40E0D0" ,fontWeight:'bold',fontSize:'1.3rem',textTransform:'capitalize',fontFamily:'fantasy'}}>{currentUser.username}
        <sup style={{color:'var(--dark-green)',fontSize:'1rem'}}>({currentUser.userType})</sup>
      </span>
      LOG OUT</Link>
      </li>
          </div>
        )}
      </ul>
    </div>
  );
}
