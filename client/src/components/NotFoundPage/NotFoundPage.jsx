import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {

    return (
        <div className={styles.main}>
        
            <span className={styles.title}>page not found</span>
            <Link to='/home'>
                <button className={styles.button}><span>Go back Home</span></button>
            </Link>
        </div>
    );
};

export default NotFoundPage;