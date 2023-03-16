//import styles from './DetailPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeDetail } from '../../redux/actions';

const DetailPage = () => {

    const recipeDetail = useSelector(state => state.recipeDetail);
    const dispatch = useDispatch();
    const { idRecipe } = useParams();
    
    useEffect( () => {
        dispatch(getRecipeDetail(idRecipe));
    }, []);

    const { id, name, title, image, summary, healthScore, instructions, vegetarian, vegan, glutenFree, diets } = recipeDetail;

    return (
        <div>
            <h2>DETAIL PAGE</h2>
            <label>id: </label>
            <h4>{id}</h4>
            <label>name: </label>
            <h4>{name}</h4>
            <label>title: </label>
            <h4>{title}</h4>
            <label>image: </label>
            <img src={image} alt={ name? name : title } />
            <label>summary: </label>
            <h4>{summary}</h4>
            <label>healthScore: </label>
            <h4>{healthScore}</h4>
            <label>instructions: </label>
            <h4>{instructions}</h4>
            <label>diets: </label>
            {
                diets?.map( diet => {
                    return <h4>{diet}</h4>
                })
            }
            
        </div>
    );
};

export default DetailPage;