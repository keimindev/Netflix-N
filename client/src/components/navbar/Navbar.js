import React, { useState , useContext } from 'react';
import { useHistory } from 'react-router';
import { Search, Notifications, ArrowDropDown } from '@material-ui/icons';
import './navbar.scss';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';
import { logout } from '../../authContext/AuthAction';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { dispatch } = useContext(AuthContext);
    const history = useHistory();

    const profileIcon = JSON.parse(localStorage.getItem('user'));

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.onscroll = null);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        history.push('/');
    }



    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
           <div className="container">
               <div className="left">
                   <img src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="logo"/>
                   <Link to="/" className="link">
                   <span>Homepage</span>
                   </Link>
                   <Link to ="/series" className="link">
                   <span className="navbar-tablet--links">Series</span>
                   </Link>
                   <Link to="/movies" className="link">
                   <span className="navbar-tablet--links">Movies</span>
                   </Link>
                   <span>New and Popular</span>
                   <span>My List</span>
               </div>
               <div className="right">
                   <Search className="icon" />
                   <span>KID</span>
                   <Notifications className="icon"/>
                   <img src={profileIcon.profilePic} alt="profile"/>
                   <div className="profile">
                    <ArrowDropDown className="icon"/>
                    <div className="options">
                        <span>Setting</span>
                        <span onClick={handleLogout}>Log out</span>
                    </div>
                   </div>
               </div>

           </div>
        </div>
    )
}

export default Navbar
