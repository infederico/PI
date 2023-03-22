
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
        <div className={styles.card}>
           
            <label className={styles.label}>health score: {healthScore}</label>
            <br />
            <label className={styles.label}>name: </label>
            <h5 className={styles.name}>{name}</h5>
            {/* <img src={image} alt={name} /> */}
            <label className={styles.label}>diets: </label> 
            {
                diets?.map((diet, index) => <span className={styles.span} key={index}>{diet}</span> )  
            }
        </div>
    );
};

export default RecipeCard;