import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setAccess } from '../../redux/actions';

import styles from './LogOut.module.css';
import logoutIcon from '../../assets/images/dark-logout-icon.png';

const LogOut = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch(setAccess())
        navigate('/home');
    };

    return (
        <button className={styles.outButton} onClick={handleClick} title='log out'>
            <img src={logoutIcon} alt='logout-icon' />
        </button>
    );
};

export default LogOut;