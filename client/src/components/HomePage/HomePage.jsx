import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getRecipes, getDiets, setSelectedSortOption, setDoubleFilteredResult, setCurrentPage } from "../../redux/actions";
import { setSelectedDiet, filterByDietAll, filterByDietVegan, filterByDietVegetarian, filterByDietGlutenfree, filterByDietCustom } from "../../redux/actions";
import { setSelectedOrigin, filterByOriginAll, filterByOriginApi, filterByOriginDb } from "../../redux/actions";

import styles from './HomePage.module.css';

import RecipeCard from "../RecipeCard/RecipeCard";

const HomePage = () => {

    const dispatch = useDispatch();
   
    const theme = useSelector(state => state.theme);
    const searchResult = useSelector(state => state.searchResult);
    const searchError = useSelector(state => state.searchError);
   
    const diets = useSelector(state => state.diets);
    const selectedDiet = useSelector(state => state.selectedDiet);
    const selectedOrigin = useSelector(state => state.selectedOrigin);
    
    const filteredOneResult = useSelector(state => state.filteredOneResult);
    const filteredTwoResult = useSelector(state => state.filteredTwoResult);
    const doubleFilteredResult = useSelector(state => state.doubleFilteredResult);
    const selectedSortOption = useSelector(state => state.selectedSortOption);
    let currentPage = useSelector(state => state.currentPage);

    useEffect( () => {
        if (searchResult.length === 0) dispatch(getRecipes());
        if (diets.length === 0) dispatch(getDiets());
    // eslint-disable-next-line
    }, []);

    useEffect( () => {
        if (filteredOneResult.length === 0 && filteredTwoResult.length === 0) {
            dispatch(setDoubleFilteredResult(searchResult));
        }
    // eslint-disable-next-line
    }, [searchResult]); 
    
    useEffect( () => {
        const combinedFiltersResult = filteredOneResult.filter(objA => {
            const objB = filteredTwoResult.find(objB => objB.id === objA.id);
            return objB !== undefined;
        });
        dispatch(setDoubleFilteredResult(combinedFiltersResult))
    // eslint-disable-next-line
    }, [filteredOneResult, filteredTwoResult]); 

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const sortFunctions = {
        'Health Score - des.': (a, b) => a.healthScore - b.healthScore,
        'Health Score - asc.': (a, b) => b.healthScore - a.healthScore,
        'Name - asc.': (a, b) => (a.name && b.name) ? (a.name).localeCompare(b.name) : 0,
        'Name - des.': (a, b) => (a.name && b.name) ? (b.name).localeCompare(a.name) : 0,
    };

    const [ sortedResult, setSortedResult ] = useState([]);
    const [ paginatedResult, setPaginatedResult ] = useState([]);

    let aux = selectedSortOption ? doubleFilteredResult?.slice().sort(sortFunctions[selectedSortOption]) : doubleFilteredResult
    useEffect(() => {
        setSortedResult(aux);
    // eslint-disable-next-line
    }, [doubleFilteredResult, selectedSortOption]);

    let auxBis = sortedResult?.slice(((currentPage * 9) - 9), (currentPage * 9))
    useEffect(() => {
        setPaginatedResult(auxBis);
    // eslint-disable-next-line
    }, [sortedResult, currentPage]);

    const pageIncrement = () => {
        if (currentPage < 12) {
            currentPage = currentPage + 1;
            dispatch(setCurrentPage(currentPage));
        }
    };

    const pageDecrement = () => {
        if (1 < currentPage) {
            currentPage = currentPage -1;
            dispatch(setCurrentPage(currentPage));
        }
    };

    const handleSortOptionChange = (event) => {
        dispatch(setSelectedSortOption(event.target.value));
        
    };

    const handleDietChange = (event) => {
        dispatch(setSelectedDiet(event.target.value));

        switch (event.target.value) {
            case '': dispatch(filterByDietAll());
            break;
            case 'vegan': dispatch(filterByDietVegan());
            break;
            case 'vegetarian': dispatch(filterByDietVegetarian());
            break;
            case 'glutenFree': dispatch(filterByDietGlutenfree());
            break;
            default: dispatch(filterByDietCustom(event.target.value));
        }
    };

    const handleOriginChange = (event) => {
        dispatch(setSelectedOrigin(event.target.value));
    
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

    return (
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

            <label htmlFor="diet-filter">Filter by diet:</label>
            <select id="diet-filter" value={selectedDiet} onChange={handleDietChange}>
                <option value="">All</option>
                <option value="vegan">vegan</option>
                <option value="vegetarian">vegetarian</option>
                <option value="glutenFree">gluten free</option>
                {
                // eslint-disable-next-line
                    diets?.map((diet, index) => {
                    if (diet.name !== 'vegan' && diet.name !== 'vegetarian' && diet.name !== 'gluten free') {
                        return <option key={index} value={diet.name}>{diet.name}</option>
                    }})
                }
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

export default HomePage;