// eslint-disable-next-line
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import styles from './RecipeCard.module.css';

const RecipeCard = (props) => { 

    const { id, name, image, healthScore, diets } = props;

    const theme = useSelector(state => state.theme);

    return (
        <div className={ theme ? styles.lightCard : styles.darkCard }>
                
            <label className={ theme ? styles.lightLabel : styles.darkLabel }>health score: {healthScore}</label>
            <br />
            <br />
            <label className={ theme ? styles.lightLabel : styles.darkLabel }>name: </label>
            <h5 className={ theme ? styles.lightName : styles.darkName }>{name}</h5>
            <NavLink to={`/detail/${id}`}>
                <img src={image} alt={name} className={styles.image} />
            </NavLink>
            <br />
            <label className={ theme ? styles.lightLabel : styles.darkLabel }>diets: </label> 
            {
                diets?.map((diet, index) => <p className={ theme ? styles.lightSpan : styles.darkSpan } key={index}>{diet}</p> )  
            }
        </div>
    );
};

export default RecipeCard;