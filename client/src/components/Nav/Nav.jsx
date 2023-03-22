import styles from './Nav.module.css';
import '../../assets/css variables/variables.css';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import lightLogo from '../../assets/images/light-logo.png';
import darkLogo from '../../assets/images/dark-logo.png';
import ToggleTheme from '../ThemeToggle/ThemeToggle';
import SearchBar from '../SearchBar/SearchBar';

const Nav = () => {
  const theme = useSelector(state => state.theme);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/home';

  return (
    <div className={ theme ? styles.lightNav : styles.darkNav }>
      
      <img
        src={ theme ? lightLogo : darkLogo } alt='logo'
        className={styles.logo}
        onClick={() => navigate('/home')}
        title='home'
      />

      <span className={theme ? styles.lightTextLogo : styles.darkTextLogo}>foody</span>

      {isHomePage && <SearchBar />}
      
      <label >
        <div className={ theme ? styles.lightNavLinks : styles.darkNavLinks }>
          <NavLink to='/create'>Create</NavLink>
          <NavLink to='/recipes'>Explore</NavLink>
          <NavLink to='/login'>Log in</NavLink>
        </div>
      </label>

      <ToggleTheme />

    </div>
  );
};

export default Nav;