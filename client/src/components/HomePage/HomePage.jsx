// eslint-disable-next-line
import { useEffect, useState } from "react";
// eslint-disable-next-line
import { useSelector, useDispatch } from "react-redux";
// eslint-disable-next-line
import { search } from "../../redux/actions";

import styles from './HomePage.module.css';

import RecipeCard from "../RecipeCard/RecipeCard";



//mockeado de api response para cuando se acaba la quote de request por dia permitidiso por la api (150/dia)
import { data } from '../../api_res.json'

// eslint-disable-next-line
const searchResult = data;







const HomePage = () => {
    let [ currentPage, setCurrentPage ] = useState(0);
    let [ selectedSortOption, setSelectedSortOption ] = useState(undefined);
    
    // const filteredResult = [];
// const doubleFilteredResult = [];
// const toOrderResult = [];
    //const sortedResult = searchResult.sort((p1, p2) => (p1.healthScore < p2.healthScore) ? 1 : (p1.healthScore > p2.healthScore ? -1 : 0));

    const sortedResult = selectedSortOption ? searchResult.slice().sort((a, b) => {
        if (selectedSortOption === 'Health Score - des.') {
          return a.healthScore - b.healthScore;
        } else if (selectedSortOption === 'Health Score - asc.') {
          return b.healthScore - a.healthScore;
        } else {
          // handle other sorting options here
          return 0;
        }
      }) : searchResult;



    const paginatedResult = sortedResult.slice((currentPage * 9), (currentPage * 9 + 9));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const theme = useSelector(state => state.theme);
    //const searchResult = useSelector(state => state.searchResult);
    //const dispatch = useDispatch();

    useEffect( () => {
    //     dispatch(search());
    }, [currentPage, selectedSortOption]);

    const pageIncrement = () => {
        currentPage = currentPage + 1;
        setCurrentPage(currentPage)
    };

    const pageDecrement = () => {
        currentPage = currentPage -1;
        setCurrentPage(currentPage)
    };

    const handleSortOptionChange = (event) => {
        setSelectedSortOption(event.target.value);

    };


    return (
        <div className={ theme ? styles.light : styles.dark}>

            <button onClick={pageDecrement}>-</button>
            <button onClick={pageIncrement}>+</button>

            <div>
                <label htmlFor="sort">Sort by:</label>
                <select id="sort" value={selectedSortOption} onChange={handleSortOptionChange}>
                    <option value="Health Score - asc.">Health Score (max to min)</option>
                    <option value="Health Score - des.">Health Score (min to max)</option>
                    
                    {/* add more options here */}
                </select>
            </div>
    
           
            <span className={styles.cards} >
                {
                    paginatedResult?.map((result) => {
                        return <RecipeCard
                            key={result.id}
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