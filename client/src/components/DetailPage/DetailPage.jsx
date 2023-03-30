import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getRecipeDetail } from '../../redux/actions';
import { cleanRecipeDetail } from '../../redux/actions';

import styles from './DetailPage.module.css';

const DetailPage = () => {
    
    const dispatch = useDispatch();
    const { idRecipe } = useParams();

    const theme = useSelector(state => state.theme);
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
    let strippedInstructions = stripHtmlTags(instructions);
  
    return (
        <div className={ theme ? styles.containerLight : styles.containerDark }>
          <div className={ theme ? styles.headerLight : styles.headerDark }>
            <h2>{name}</h2>
          </div>
          <div className={styles.body}>
            <div className={styles.imageContainer}>
              <img src={image} alt={name} />
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.infoItem}>
                <label>Summary: </label>
                <p>{strippedSummary}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Health Score: </label>
                <p>{healthScore}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Instructions: </label>
                <p>{strippedInstructions}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Diets: </label>
                <div className={theme ? styles.dietsContainerLight : styles.dietsContainerDark}>
                  {diets?.map((diet, index) => {
                    return <span key={index}>{diet}</span>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
};

export default DetailPage;