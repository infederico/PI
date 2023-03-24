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
    const { id, name, title, image, summary, healthScore, instructions, diets } = recipeDetail;
    
    useEffect( () => {
        dispatch(getRecipeDetail(idRecipe));
        return () => {
            dispatch(cleanRecipeDetail());
        }
    // eslint-disable-next-line
    }, []);

    console.log(summary);
    const stripHtmlTags = (html) => {
        if (!html) return ""; // return empty string if html is undefined or null
        const strippedHtml = html.replace(/(<([^>]+)>)/gi, "");
        return strippedHtml;
    };

    let strippedSummary = stripHtmlTags(summary);
    console.log(strippedSummary);

    return (
        <div>
            <label>id: </label>
            <h4>{id}</h4>
            <label>name: </label>
            <h4>{name}</h4>
            <label>title: </label>
            <h4>{title}</h4>
            <label>image: </label>
            <img src={image} alt={ name? name : title } />
            <label>summary: </label>
            <h4>{strippedSummary}</h4>
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