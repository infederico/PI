import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './RecipeCard.module.css';

const RecipeCard = (props) => { 
    const { name, image, diets } = props;
    const theme = useSelector(state => state.theme);

    return (
        <div className={styles.card}>
           
            <label>name: </label>
            <span>{name}</span>
            <img src={image} alt={name} />
            <label>diets: </label> 
            {
                diets.map((diet) => <span>{diet.name}</span>)  
            }
        </div>
    );
};

export default RecipeCard;