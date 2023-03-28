//import styles from './DetailPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeDetail } from '../../redux/actions';
import { cleanRecipeDetail } from '../../redux/actions';

const DetailPage = () => {
    
    const dispatch = useDispatch();
    const { idRecipe } = useParams();

    const recipeDetail = useSelector(state => state.recipeDetail);
    const { name, image, summary, healthScore, instructions, diets } = recipeDetail;
    
    useEffect( () => {
        dispatch(getRecipeDetail(idRecipe));
        return () => {
            dispatch(cleanRecipeDetail());
        }
    // eslint-disable-next-line
    }, []);

    const stripHtmlTags = (html) => {
        if (!html) return ""; // return empty string if html is undefined or null
        const strippedHtml = html.replace(/(<([^>]+)>)/gi, "");
        return strippedHtml;
    };

    let strippedSummary = stripHtmlTags(summary);
  
    return (
        <div>
            <label>name: </label>
            <h4>{name}</h4>
            <label>image: </label>
            <img src={image} alt={name} />
            <label>summary: </label>
            <h4>{strippedSummary}</h4>
            <label>healthScore: </label>
            <h4>{healthScore}</h4>
            <label>instructions: </label>
            <h4>{instructions}</h4>
            <label>diets: </label>
            {
                diets?.map( (diet, index) => {
                    return <h4 key={index}>{diet}</h4>
                })
            }
            
        </div>
    );
};

export default DetailPage;