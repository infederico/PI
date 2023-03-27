// eslint-disable-next-line
import React, { useEffect, useState, useRef } from "react";
// eslint-disable-next-line
import { useSelector, useDispatch } from "react-redux";
// eslint-disable-next-line
import { getRecipes, getDiets } from "../../redux/actions";
import { filterByOriginAll, filterByOriginApi, filterByOriginDb } from "../../redux/actions";
import { filterByDietAll, filterByDietVegan, filterByDietVegetarian, filterByDietGlutenfree } from "../../redux/actions";

import styles from './HomePage.module.css';
import RecipeCard from "../RecipeCard/RecipeCard";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mockeado de api response para cuando se acaba la quote de request por dia permitidos por la api (150/dia)
// import { data } from '../../api_res.json'
// console.log(data);
// eslint-disable-next-line
// const searchResult = data;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const HomePage = () => {

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch();
   
    const theme = useSelector(state => state.theme);
    const searchResult = useSelector(state => state.searchResult);
    const searchError = useSelector(state => state.searchError);
    const diets = useSelector(state => state.diets);
    
    const filteredOneResult = useSelector(state => state.filteredOneResult);
    const filteredTwoResult = useSelector(state => state.filteredTwoResult);
    const doubleFilteredResult = useSelector(state => state.doubleFilteredResult);
    const unsortedResult = useSelector(state => state.unsortedResult);
    const sortedResult = useSelector(state => state.sortedResult);
    const paginatedResult = useSelector(state => state.paginatedResult);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect( () => {
        if (searchResult.length === 0) {
            dispatch(getRecipes());
        }
        dispatch(getDiets());
    // eslint-disable-next-line
    }, []); 

    let [ currentPage, setCurrentPage ] = useState(1);
    let [ selectedSortOption, setSelectedSortOption ] = useState(undefined);
    let [ selectedDiet, setSelectedDiet ] = useState('');
    let [ selectedOrigin, setSelectedOrigin ] = useState('');

    const sortFunctions = {
        'Health Score - des.': (a, b) => a.healthScore - b.healthScore,
        'Health Score - asc.': (a, b) => b.healthScore - a.healthScore,
        'Name - asc.': (a, b) => ((a.name || a.title) && (b.name || b.title)) ? (a.name || a.title).localeCompare(b.name || b.title) : 0,
        'Name - des.': (a, b) => ((a.name || a.title) && (b.name || b.title)) ? (b.name || b.title).localeCompare(a.name || a.title) : 0,
    };
    
    //sortedResult = selectedSortOption ? unsortedResult.slice().sort(sortFunctions[selectedSortOption]) : unsortedResult;
      
    //paginatedResult = sortedResult.slice(((currentPage * 9) - 9), (currentPage * 9));

    const pageIncrement = () => {
        if (currentPage < 12) {
            currentPage = currentPage + 1;
            setCurrentPage(currentPage);
        }
    };

    const pageDecrement = () => {
        if (1 < currentPage) {
            currentPage = currentPage -1;
            setCurrentPage(currentPage);
        }
    };

    const handleSortOptionChange = (event) => {
        setSelectedSortOption(event.target.value);
    };

    const handleDietChange = (event) => {
        setSelectedDiet(event.target.value);

        switch (event.target.value) {
            case '': dispatch(filterByDietAll());
            break;
            case 'vegan': dispatch(filterByDietVegan());
            break;
            case 'vegetarian': dispatch(filterByDietVegetarian());
            break;
            case 'glutenFree': dispatch(filterByDietGlutenfree());
            break;
            default: return;
        }
    };

    const handleOriginChange = (event) => {
        setSelectedOrigin(event.target.value);
    
        switch (event.target.value) {
            case '': dispatch(filterByOriginAll());
            break;
            case 'api': dispatch(filterByOriginApi());
            break;
            case 'db': dispatch(filterByOriginDb());
            break;
            default: return;
        }
    };

    /////////////////////////////////// go to top button /////////////////////////////////////////////
    // const [showButton, setShowButton] = useState(false);
    // const handleScroll = () => {
    //     if (window.pageYOffset > 300) {
    //     setShowButton(true);
    //     } else {
    //     setShowButton(false);
    //     }
    // };
    // const handleButtonClick = () => {
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    // };
    // window.addEventListener('scroll', handleScroll);
    ////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <React.StrictMode>
        <div className={ theme ? styles.light : styles.dark}>

            <button onClick={pageDecrement}>-</button>
            <span>{`     ${currentPage}     `}</span>
            <button onClick={pageIncrement}>+</button>

            {searchError && <span className={styles.error}>{searchError}</span>}
            {!searchError && searchResult.length !== 0 && <span className={styles.error}>{`${searchResult.length} recipes found`}</span>}

            <div>
                <label htmlFor="sort">Sort by:</label>
                <select id="sort" value={selectedSortOption} onChange={handleSortOptionChange}>
                    <option value="no sort"></option>
                    <option value="Health Score - asc.">Health Score (max to min)</option>
                    <option value="Health Score - des.">Health Score (min to max)</option>
                    <option value="Name - asc.">Name - asc. (A to Z)</option>
                    <option value="Name - des.">Name - asc. (Z to A)</option>
                </select>
            </div>


            <div>{diets[2]?.name}</div>

            <label htmlFor="diet-filter">Filter by diet:</label>
            <select id="diet-filter" value={selectedDiet} onChange={handleDietChange}>
                <option value="">All</option>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="glutenFree">Gluten Free</option>
            </select>

            <label htmlFor="origin-filter">Filter by origin:</label>
            <select id="origin-filter" value={selectedOrigin} onChange={handleOriginChange}>
                <option value="">All</option>
                <option value="api">API</option>
                <option value="db">DB</option>
            </select>


            <span className={styles.cards} >
                {
                    paginatedResult?.map((result) => {
                        return <RecipeCard
                            key={result.id}
                            id={result.id}
                            healthScore={result.healthScore}
                            name={result.name || result.title}
                            image={result.image}
                            diets={result.diets}
                            />
                    })
                }
            </span>

            {/* {showButton && (<button onClick={handleButtonClick}>Go to top</button>)} */}

        </div>
        </React.StrictMode>
    );
};

export default HomePage;