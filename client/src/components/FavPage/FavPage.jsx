import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setFavCurrentPage, getAllFavorites } from '../../redux/actions';

//import SortBy from '../SortBy/SortBy';
//import FilterByDiet from '../FilterByDiet/FilterByDiet';
//import FilterByOrigin from '../FilterByOrigin/FilterByOrigin';
import RecipeCard from '../RecipeCard/RecipeCard';


import styles from './FavPage.module.css';

const FavPage = () => { 
    // hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // global states
    const theme = useSelector(state => state.theme);
    const access = useSelector(state => state.access);
    const favCurrentPage = useSelector(state => state.favCurrentPage);
    const favorites = useSelector(state => state.favorites);
    const userId = useSelector(state => state.userId);
    // local states
    const [ lastCurrentPage, setLastCurrentPage ] = useState(1);

    useEffect( () => {
        if (!access) navigate('/login');
        if (access) dispatch(getAllFavorites(userId));
    }, [access]);

    useEffect(() => {
       
        let totalPages = Math.ceil(favorites.length / 9);
        setLastCurrentPage(totalPages);

    // eslint-disable-next-line
    }, []);

    const pageIncrement = () => {
        if (favCurrentPage < lastCurrentPage) {
            let nextPage = favCurrentPage + 1;
            dispatch(setFavCurrentPage(nextPage));
        }
    };

    const pageDecrement = () => {
        if (1 < favCurrentPage) {
            let prevPage = favCurrentPage -1;
            dispatch(setFavCurrentPage(prevPage));
        }
    };
    
    return (
        <div className={ theme ? styles.light : styles.dark}>

           <h2>Keep all your favorites recipes in one place</h2>

           <div className={styles.containerSortFilters} >
                <div className={styles.pagination}>
                    <button onClick={pageDecrement}>prev</button>
                    <span>{`Page ${favCurrentPage}`}</span>
                    <button onClick={pageIncrement}>next</button>
                </div>
                {/* <SortBy />
                <FilterByDiet />
                <FilterByOrigin /> */}
            </div>
           
            <span className={styles.cards} >
                {
                    favorites?.map((result) => {
                        return <RecipeCard
                            key={result.id}
                            id={result.id}
                            healthScore={result.healthScore}
                            name={result.name}
                            image={result.image}
                            diets={result.diets}
                            />
                    })
                }
            </span>

        </div>
    );
};

export default FavPage;