    import styles from './LandingPage.module.css';
    import { Link } from 'react-router-dom';

    const LandingPage = () => {

        return (
            <div>
                <div className={styles.main}>
                    <span className={styles.title}>foody</span>
                    <span className={styles.subtitle}>the recipe book made easy</span>
                    <Link to='/home'>
                        <button className={styles.button}><span>Let's cook!</span></button>
                    </Link>
                </div>
            </div>
        );
    };

    export default LandingPage;