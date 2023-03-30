import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getRandomRecipe, cleanRandomRecipe } from '../../redux/actions';

import styles from './ExplorePage.module.css';

const ExplorePage = () => {
    
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme);
    const randomRecipe = useSelector(state => state.randomRecipe);
    //const { name, image, summary, healthScore, instructions, diets } = randomRecipe;
    
    useEffect( () => {
        dispatch(getRandomRecipe());
        return () => {
            dispatch(cleanRandomRecipe());
        }
    // eslint-disable-next-line
    }, []);

    const stripHtmlTags = (html) => {
        if (!html) return ""; // return empty string if html is undefined or null
        const strippedHtml = html.replace(/(<([^>]+)>)/gi, "");
        return strippedHtml;
    };

    let strippedSummary = stripHtmlTags(randomRecipe?.summary);
    let strippedInstructions = stripHtmlTags(randomRecipe?.instructions);

    const handleClick = () => {
      dispatch(cleanRandomRecipe());
      dispatch(getRandomRecipe());
    };
  
    return (
        <div className={ theme ? styles.containerLight : styles.containerDark }>
          <button className={styles.button} onClick={handleClick}><span>Random Recipe</span></button>
          <div className={ theme ? styles.headerLight : styles.headerDark }>
            <h2>{randomRecipe?.name}</h2>
          </div>
          <div className={styles.body}>
            <div className={styles.imageContainer}>
              <img src={randomRecipe?.image} alt={randomRecipe?.name} />
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.infoItem}>
                <label>Summary: </label>
                <p>{strippedSummary}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Health Score: </label>
                <p>{randomRecipe?.healthScore}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Instructions: </label>
                <p>{strippedInstructions}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Diets: </label>
                <div className={theme ? styles.dietsContainerLight : styles.dietsContainerDark}>
                  {randomRecipe.diets?.map((diet, index) => {
                    return <span key={index}>{diet}</span>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
};

export default ExplorePage;