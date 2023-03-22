import styles from './NotFoundPage.module.css';
import '../../assets/css variables/variables.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NotFoundPage = () => {

    const theme = useSelector(state => state.theme);

    return (
        <div>
            <div className={styles.main}>
                <span className={ theme ? styles.lightThemeShade : styles.darkThemeShade }></span>
                    <span className={styles.title}>page not found</span>
                    <Link to='/home'>
                        <button className={styles.button}><span>Go back Home</span></button>
                    </Link>
                </div>
        </div>
    );
};

export default NotFoundPage;