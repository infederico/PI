// eslint-disable-next-line
import styles from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {

    return (
        <div>
            <div className={styles.main}>
                    <span className={styles.title}>page not found</span>
                    <Link to='/home'>
                        <button className={styles.button}><span>Go back to Home</span></button>
                    </Link>
                </div>
        </div>
    );
};

export default NotFoundPage;