import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setAccess } from '../../redux/actions';

const LogOut = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setAccess());
        navigate('/home');
    }, []);

    return (
        <>
          
        </>
    );
};

export default LogOut;