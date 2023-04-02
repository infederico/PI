import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { login } from '../../redux/actions';

import styles from './LogIn.module.css';

import validation from './validation';

const LogIn = () => {

    const theme = useSelector(state => state.theme);

    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });

    const [ errors, setErrors ] = useState({
        username: '',
        password: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const access = useSelector(state => state.access);
    const loginError = useSelector(state => state.loginError);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect( () => {
        return () => {
            setUserData({
                username: '',
                password: ''
            });
            setErrors({
                username: '',
                password: ''
            });
            setSubmitted(false);
        }
    }, []);
    
    useEffect( () => {
        access ? navigate('/favorites') : navigate('/login');
    }, [access, navigate]);

    const handleInputChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
        if (submitted) {
            setErrors(
                validation({
                    ...userData,
                    [event.target.name]: event.target.value
                })
            );
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);

        let aux = validation(userData);
        setErrors(aux);

        if ((Object.keys(aux).length) !== 0) {
            return;
        }

        // if there is no errors on the process of validation
        if (Object.keys(aux).length === 0) {

            dispatch(login(userData));

            setUserData({
                username: '',
                password: ''
            });
            setErrors({
                username: '',
                password: ''
            });
            setSubmitted(false);

            return;
        }
    };

    return (
        <>
            { loginError && <p className={  theme ? styles.lightErrors : styles.darkErrors } >{loginError}</p> }

            <form onSubmit={handleSubmit} className={styles.formu}>

            <label className={styles.label}>Username</label>
            <input 
                name='username'
                type='text'
                value={userData.username} 
                onChange={handleInputChange}
                style={{outline: "none"}}    
            />

            {submitted && errors.username && <p className={  theme ? styles.lightErrors : styles.darkErrors } >{errors.username}</p>}
            <br />
            <br />

            <label>Password</label>
            <input
                name='password'
                type="password"
                value={userData.password} 
                onChange={handleInputChange}
                style={{outline: "none"}} 
            />
            {submitted && errors.password && <p className={  theme ? styles.lightErrors : styles.darkErrors } >{errors.password}</p>}
            <br />
            <br />
            <br />
            <br />
            <button className={styles.button}> <span>LOGIN</span> </button>
        </form>

        <Link to='/register'>
            <p className={styles.linkRegister} >Register</p>
        </Link>
        
        </>
    );
};

export default LogIn;

  
