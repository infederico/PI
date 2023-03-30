import { useSelector } from 'react-redux';
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import ToggleTheme from '../ThemeToggle/ThemeToggle';
import SearchBar from '../SearchBar/SearchBar';

import styles from './Nav.module.css';
import lightLogo from '../../assets/images/light-logo.png';
import darkLogo from '../../assets/images/dark-logo.png';

const Nav = () => {
  const theme = useSelector(state => state.theme);

  const location = useLocation();
  const isHomePage = location.pathname === '/home';
  
  const navigate = useNavigate();
  const handleClick = () => {
    if (!isHomePage) navigate('/home');
  };

  return (
    <div className={ theme ? styles.lightNav : styles.darkNav }>
      <div className={styles.homeContainer} onClick={handleClick} title='home'>
        <img
          src={ theme ? lightLogo : darkLogo } alt='logo-home'
          className={styles.logo}
        />
        <div className={ theme ? styles.lightTextLogo : styles.darkTextLogo }>foody</div>
      </div>

      {isHomePage && <SearchBar />}
    
      <div className={styles.navLinkContainer}>
        <div className={ theme ? styles.lightNavLinks : styles.darkNavLinks }>
          <NavLink to='/create'>Create</NavLink>
          <NavLink to='/explore'>Explore</NavLink>
          <NavLink to='/favorites'>Favorites</NavLink>
          <NavLink to='/login'>Log in</NavLink>
        </div>
      </div>
      
      <ToggleTheme />
      
    </div>
  );
};

export default Nav;