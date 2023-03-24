
// eslint-disable-next-line
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line
import { Link } from 'react-router-dom';

import styles from './RecipeCard.module.css';

const RecipeCard = (props) => { 
// eslint-disable-next-line
    const { name, image, healthScore, diets } = props;
// eslint-disable-next-line
    const theme = useSelector(state => state.theme);

    return (
        <div className={ theme ? styles.lightCard : styles.darkCard }>
           
            <label className={ theme ? styles.lightLabel : styles.darkLabel }>health score: {healthScore}</label>
            <br />

            <label className={ theme ? styles.lightLabel : styles.darkLabel }>name: </label>

            <h5 className={ theme ? styles.lightName : styles.darkName }>{name}</h5>

            <img src={image} alt={name} className={styles.image} />

            <label className={ theme ? styles.lightLabel : styles.darkLabel }>diets: </label> 
            {
                diets?.map((diet, index) => <p className={ theme ? styles.lightSpan : styles.darkSpan } key={index}>{diet}</p> )  
            }
        </div>
    );
};

export default RecipeCard;