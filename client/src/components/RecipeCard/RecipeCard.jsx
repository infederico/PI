
// eslint-disable-next-line
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './RecipeCard.module.css';

const RecipeCard = (props) => { 
// eslint-disable-next-line
    const { id, name, image, healthScore, diets } = props;
// eslint-disable-next-line
    const theme = useSelector(state => state.theme);

    return (
        <div className={ theme ? styles.lightCard : styles.darkCard }>
            
            <label className={ theme ? styles.lightLabel : styles.darkLabel }>health score: {healthScore}</label>
            <br />
            <br />
            <br />

            <label className={ theme ? styles.lightLabel : styles.darkLabel }>name: </label>
            <Link to={`/detail/${id}`}>
                <h5 className={ theme ? styles.lightName : styles.darkName }>{name}</h5>
            </Link>

            <img src={image} alt={name} className={styles.image} />
            <br />

            <label className={ theme ? styles.lightLabel : styles.darkLabel }>diets: </label> 
            {
                diets?.map((diet, index) => <p className={ theme ? styles.lightSpan : styles.darkSpan } key={index}>{diet}</p> )  
            }
        </div>
    );
};

export default RecipeCard;