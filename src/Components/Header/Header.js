import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  
return (
  <div className="header">
    <div className="headerLeft">
      <Link to="/">
        <img className="header__icon"
            src="https://miro.medium.com/v2/resize:fit:512/1*UaUZmFbQmQ4ZstvGQ-JFeA.png"
            alt="Logo"/>
      </Link>
      <Link to="/movies/popular" style={{ textDecoration: 'none' }}>
        <span>Popular</span>
      </Link>
      <Link to="/movies/now_playing" style={{ textDecoration: 'none' }}>
        <span>Now Playing</span>
      </Link>
      <Link to="/movies/top_rated" style={{ textDecoration: 'none' }}>
        <span>Top Rated</span>
      </Link>
      <Link to="/movies/upcoming" style={{ textDecoration: 'none' }}>
        <span>Upcoming</span>
      </Link>
      <Link to="/movies/search" style={{textDecoration: "none"}}>
        <span>Search your Movies</span>
      </Link>
          
    </div>
    <div className="notificationIcon headerRight">
        <Link to="/notifications">
          <FontAwesomeIcon icon={faBell} className="bellIcon" />
        </Link>
        <Link to="/profile">
          <img
            className="userIcon" 
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" 
            alt="User"
          />
        </Link>
      </div>
  </div>
  );
};

export default Header;




