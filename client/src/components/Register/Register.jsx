import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createNewUser } from '../../redux/actions';

import styles from './Register.module.css';

import lightShowPassIcon from '../../assets/images/light-show-pass-icon.png';
import lightHidePassIcon from '../../assets/images/light-hide-pass-icon.png';
import darkShowPassIcon from '../../assets/images/dark-show-pass-icon.png';
import darkHidePassIcon from '../../assets/images/dark-hide-pass-icon.png';

import validation from './validation';

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // global states
    // eslint-disable-next-line
    const theme = useSelector(state => state.theme);
    const backendErrors = useSelector(state => state.backendErrors);

    // local states
    const [ newUserData, setNewUserData ] = useState({
        name: '',
        surname: '',
        email: '',
        username: '',
        password: ''
    });
    const [ errors, setErrors ] = useState({});
    const [ submitted, setSubmitted ] = useState(false);
    const [ togglePass, setTogglePass ] = useState('text');

    useEffect( () => {
        return () => {
            setSubmitted(false);
            setErrors({});
            setNewUserData({});
        }
    }, []);
    
    const handleClick = (event) => {
        event.preventDefault();
        if (togglePass === 'text') {
            setTogglePass('password');
        } else if (togglePass === 'password') {
            setTogglePass('text');
        }   
    };

    const handleChange = (event) => {
        setNewUserData({
            ...newUserData,
            [event.target.name]: event.target.value
        });
        if (submitted) setErrors(validation(newUserData));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //set submitted state true to allow errors rendering after first submit attemp
        setSubmitted(true);

        // pass to validation f()  - errors will be logged on errors local state
        let aux = validation(newUserData);
        setErrors(aux); 
        if ((Object.keys(aux).length) !== 0) {
            alert('Register not submitted. Please follow the instructions');
            return;
        }
        // if there is no errors on the process of validation
        if (Object.keys(aux).length === 0) {
            //action dispatch - crate new recipe in DB
            dispatch(createNewUser(newUserData));
            //clean local state after sending all data
            setNewUserData({
                name: '',
                surname: '',
                email: '',
                username: '',
                password: '',
            });
            // clean error log local state
            setErrors({});
            //reset the local state once the new user was created successfully to permit a good user experience and dont show errors until first submit attemp in the next user load
            setSubmitted(false);
            navigate('/login')
            return;
        }
    };

    return (
        <div className={ theme ? styles.light : styles.dark } >
            
            <form onSubmit={handleSubmit} className={styles.formu}>
        
                { backendErrors && <p className={styles.errors} >{backendErrors}</p> }
                <br />

                <label>Name: </label>
                <br />
                <input type='text' name='name' onChange={handleChange} value={newUserData.name} style={{outline: "none"}} />
                <br />
                {errors.name1 && <span className={ theme ? styles.lightErrors : styles.darkErrors } >{errors.name1}</span>}
                {errors.name2 && <span className={ theme ? styles.lightErrors : styles.darkErrors } >{errors.name2}</span>}
                {errors.name3 && <span className={ theme ? styles.lightErrors : styles.darkErrors } >{errors.name3}</span>}

                <label>Surname: </label>
                <br />
                <input type='text' name='surname' onChange={handleChange} value={newUserData.surname} style={{outline: "none"}} />
                <br />
                {errors.surname1 && <span className={ theme ? styles.lightErrors : styles.darkErrors } >{errors.surname1}</span>}
                {errors.surname2 && <span className={ theme ? styles.lightErrors : styles.darkErrors } >{errors.surname2}</span>}
                {errors.surname3 && <span className={ theme ? styles.lightErrors : styles.darkErrors } >{errors.surname3}</span>}

                <label>Email: </label>
                <br />
                <input type='text' name='email' onChange={handleChange} value={newUserData.email} style={{outline: "none"}} />
                <br />
                {errors.email1 && <span className={ theme ? styles.lightErrors : styles.darkErrors } >{errors.email1}</span>}
                {errors.email2 && <span className={ theme ? styles.lightErrors : styles.darkErrors } >{errors.email2}</span>}
                {errors.email3 && <span className={ theme ? styles.lightErrors : styles.darkErrors } >{errors.email3}</span>}
            
                <label>Username: </label>
                <br />
                <input type='text' name='username' onChange={handleChange} value={newUserData.username} style={{outline: "none"}} />
                <br />
                {errors.username1 && <span className={ theme ? styles.lightErrors : styles.darkErrors } >{errors.username1}</span>}
                {errors.username2 && <span className={ theme ? styles.lightErrors : styles.darkErrors } >{errors.username2}</span>}
                {errors.username3 && <span className={ theme ? styles.lightErrors : styles.darkErrors } >{errors.username3}</span>}
            
                <label>Password: </label>
                <br />
                <div>
                    <input type={togglePass} name='password' onChange={handleChange} value={newUserData.password} style={{outline: "none"}} />
                    <button className={styles.passToggleButton} onClick={handleClick}>
                        {togglePass === 'text' && <img src={ theme ? lightShowPassIcon : darkShowPassIcon } alt='show-pass-icon' /> }
                        {togglePass === 'password' && <img src={ theme ? lightHidePassIcon : darkHidePassIcon } alt='hide-pass-icon' /> } 
                    </button>
                </div>  
                <br />
                {errors.password1 && <span className={ theme ? styles.lightErrors : styles.darkErrors } >{errors.password1}</span>}
                {errors.password2 && <span className={ theme ? styles.lightErrors : styles.darkErrors } >{errors.password2}</span>}
                {errors.password3 && <span className={ theme ? styles.lightErrors : styles.darkErrors } >{errors.password3}</span>}

                <button type='submit' className={styles.button}><span>Register</span></button>
                <br />
            </form>

        </div>
    );
};

export default Register;