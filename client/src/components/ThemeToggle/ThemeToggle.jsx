import styles from './ThemeToggle.module.css';
import lightTheme from '../../assets/images/light-mode.png';
import darkTheme from '../../assets/images/dark-mode.png';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/actions';

const ToggleTheme = () => { 

    const theme = useSelector(state => state.theme);
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(toggleTheme())
    };

    return (
        <>
            <button className={styles.theme} onClick={clickHandler} title='toggle dark/light mode'>
                <img src={ theme ? lightTheme : darkTheme } alt='themeIcon' />
            </button>
        </>
    );
};

export default ToggleTheme;