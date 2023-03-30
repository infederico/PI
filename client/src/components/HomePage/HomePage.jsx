import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getRecipes, getDiets, setSelectedSortOption, setDoubleFilteredResult, setCurrentPage } from "../../redux/actions";
import { setSelectedDiet, filterByDietAll, filterByDietVegan, filterByDietVegetarian, filterByDietGlutenfree, filterByDietCustom } from "../../redux/actions";
import { setSelectedOrigin, filterByOriginAll, filterByOriginApi, filterByOriginDb } from "../../redux/actions";

import styles from './HomePage.module.css';

import RecipeCard from '../RecipeCard/RecipeCard';

const HomePage = () => {

    const dispatch = useDispatch();
    // for toggle light/dark mode
    const theme = useSelector(state => state.theme);
    // search bar resulting states
    const searchResult = useSelector(state => state.searchResult);
    const searchError = useSelector(state => state.searchError);
    // states for filtering
    const diets = useSelector(state => state.diets);
    const selectedDiet = useSelector(state => state.selectedDiet);
    const selectedOrigin = useSelector(state => state.selectedOrigin);
    const filteredOneResult = useSelector(state => state.filteredOneResult);
    const filteredTwoResult = useSelector(state => state.filteredTwoResult);
    const doubleFilteredResult = useSelector(state => state.doubleFilteredResult);
    //state for sorting
    const selectedSortOption = useSelector(state => state.selectedSortOption);
    // state for pagination
    let currentPage = useSelector(state => state.currentPage);

    // at component mounting it brings the first 100 recipes from endpoitn /recipes and load as the "first by defaul search" to enhance UX and recieve the user not with a blanck screen
    // at component mounting it brings diets data and store in global state to load filter by diet filter
    useEffect( () => {
        if (searchResult.length === 0) dispatch(getRecipes());
        if (diets.length === 0) dispatch(getDiets());
    // eslint-disable-next-line
    }, []);
    
    // first use and everytime the user search - the app keep save the both filters and sort option states and apply directly to the new search results to enhance UX - when user is in page 7 for example and then search and the new search results it below this quantity on pages - it automatically bring user back to page 1 of the new results rendered
    useEffect( () => {
        if (selectedDiet === '' && selectedOrigin === '') dispatch(setDoubleFilteredResult(searchResult));
        if (selectedDiet !== '' && selectedOrigin === '') filterByDietDispatcher(selectedDiet);
        if (selectedDiet === '' && selectedOrigin !== '') filterByOriginDispatcher(selectedOrigin);
        if (selectedDiet !== '' && selectedOrigin !== '') {
            filterByDietDispatcher(selectedDiet);
            filterByOriginDispatcher(selectedOrigin);
        }
        dispatch(setCurrentPage(1));
    // eslint-disable-next-line
    }, [searchResult]);

    // hook for component update - every time filter1 or filter2 arrays of results change it return the corresponding case results array of combined filtering - it takes in count first uses when the user not apply any of both filters yet - default filtering apply an "All" filtering in both filters - store unsorted results in a global state to be taken, sorted, paginated amd rendered
    useEffect( () => {
        if (selectedDiet && !selectedOrigin) {
            dispatch(setDoubleFilteredResult(filteredOneResult));
        }
        if (!selectedDiet && selectedOrigin) {
            dispatch(setDoubleFilteredResult(filteredTwoResult));
        }
        if (selectedDiet && selectedOrigin) {
            const combinedFiltersResult = filteredOneResult.filter(objA => {
                const objB = filteredTwoResult.find(objB => objB.id === objA.id);
                return objB !== undefined;
            });
        dispatch(setDoubleFilteredResult(combinedFiltersResult))
        }
    // eslint-disable-next-line
    }, [filteredOneResult, filteredTwoResult]); 

    // function for dispatch the correspoding redux action in each case of user filtering by diet
    const filterByDietDispatcher = (selectedDiet) => {
        switch (selectedDiet) {
            case 'all': dispatch(filterByDietAll());
            break;
            case 'vegan': dispatch(filterByDietVegan());
            break;
            case 'vegetarian': dispatch(filterByDietVegetarian());
            break;
            case 'glutenFree': dispatch(filterByDietGlutenfree());
            break;
            default: dispatch(filterByDietCustom(selectedDiet));
            break;
        }
    };

    // function for dispatch the correspoding redux action in each case of user filtering by origin
    const filterByOriginDispatcher = (selectedOrigin) => {
        switch (selectedOrigin) {
            case 'all': dispatch(filterByOriginAll());
            break;
            case 'api': dispatch(filterByOriginApi());
            break;
            case 'db': dispatch(filterByOriginDb());
            break;
            default: break;
        }
    };

    // functions with each sorting option logic - mapped to an object for cleaner code
    const sortFunctions = {
        'Health Score - des.': (a, b) => a.healthScore - b.healthScore,
        'Health Score - asc.': (a, b) => b.healthScore - a.healthScore,
        'Name - asc.': (a, b) => (a.name && b.name) ? (a.name).localeCompare(b.name) : 0,
        'Name - des.': (a, b) => (a.name && b.name) ? (b.name).localeCompare(a.name) : 0,
    };

    // local state to keep track and store the results with the corresponding order applied
    const [ sortedResult, setSortedResult ] = useState([]);

    // aux logic that not necessary to keep tracked on local or global state - if the user has choosen or changed sort option
    let auxSortedResult = selectedSortOption ? doubleFilteredResult.slice().sort(sortFunctions[selectedSortOption]) : doubleFilteredResult;
    // then this hook sort it content and store the sorted result array in a local state to be paginated - then it calculates the last page possible taking acount of the results quantity - store this max page in a local state to proper and dinamic pagination
    useEffect(() => {
        setSortedResult(auxSortedResult);
        let totalRecipesToPaginate = doubleFilteredResult.length;
        let totalPages = Math.ceil(totalRecipesToPaginate / 9);
        setLastCurrentPage(totalPages);
    // eslint-disable-next-line
    }, [doubleFilteredResult, selectedSortOption]);

    // local states to keep track of last page possible with current results and the current results to paginate
    const [ paginatedResult, setPaginatedResult ] = useState([]);
    const [ lastCurrentPage, setLastCurrentPage ] = useState(1);
    
    // aux logic not necesary to store in global - it calculates dinamicly - it take the results array to be paginated and prepare the final array to be rendered by component in base o selected page and result availables 
    let auxPaginatedResult = sortedResult.slice(((currentPage * 9) - 9), (currentPage * 9))
    useEffect(() => {
        setPaginatedResult(auxPaginatedResult);
    // eslint-disable-next-line
    }, [sortedResult, currentPage]);

    const pageIncrement = () => {
        if (currentPage < lastCurrentPage) {
            let nextPage = currentPage + 1;
            dispatch(setCurrentPage(nextPage));
        }
    };

    const pageDecrement = () => {
        if (1 < currentPage) {
            let prevPage = currentPage -1;
            dispatch(setCurrentPage(prevPage));
        }
    };

    const handleSortOptionChange = (event) => {
        dispatch(setSelectedSortOption(event.target.value));
    };

    const handleDietChange = (event) => {
        dispatch(setSelectedDiet(event.target.value));
        filterByDietDispatcher(event.target.value);
        dispatch(setCurrentPage(1));
    };

    const handleOriginChange = (event) => {
        dispatch(setSelectedOrigin(event.target.value));
        filterByOriginDispatcher(event.target.value);
        dispatch(setCurrentPage(1));
    };

    return (
        <div className={ theme ? styles.light : styles.dark}>

            <button onClick={pageDecrement}>-</button>
            <span>{`${currentPage}`}</span>
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

            {/* <label htmlFor="diet-filter">Filter by diet:</label>
            <select id="diet-filter" value={selectedDiet} onChange={handleDietChange}>
                <option value="all">All</option>
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
            </select> */}

            <label htmlFor="origin-filter">Filter by origin:</label>
            <select id="origin-filter" value={selectedOrigin} onChange={handleOriginChange}>
                <option value="all">All</option>
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