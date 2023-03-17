import styles from './LandingPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/actions';
import { Link } from 'react-router-dom';

const LandingPage = () => {

    const theme = useSelector(state => state.theme)
    const dispatch = useDispatch();

    const clickHandler = (event) => {
        dispatch(toggleTheme());
    };

    return (
        <div>
            <div className={styles.main}>
                <Link to='/home'>
                    <button className={styles.button}><span>Let's cook!</span></button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;