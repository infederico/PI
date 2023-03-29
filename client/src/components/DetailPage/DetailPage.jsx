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
                <p>{instructions}</p>
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










//  <div>
//                 <label>name: </label>
//                 <h4>{name}</h4>
//                 <label>image: </label>
//                 <img src={image} alt={name} />
//                 <label>summary: </label>
//                 <h4>{strippedSummary}</h4>
//                 <label>healthScore: </label>
//                 <h4>{healthScore}</h4>
//                 <label>instructions: </label>
//                 <h4>{instructions}</h4>
//                 <label>diets: </label>
//                 {
//                     diets?.map( (diet, index) => {
//                         return <h4 key={index}>{diet}</h4>
//                     })
//                 }
//             </div>