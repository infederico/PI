// eslint-disable-next-line
import { useEffect, useState, useRef } from "react";
// eslint-disable-next-line
import { useSelector, useDispatch } from "react-redux";
// eslint-disable-next-line
import { search } from "../../redux/actions";
import styles from './HomePage.module.css';
import RecipeCard from "../RecipeCard/RecipeCard";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mockeado de api response para cuando se acaba la quote de request por dia permitidiso por la api (150/dia)
// import { data } from '../../api_res.json'
// console.log(data);
// eslint-disable-next-line
// const searchResult = data;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const HomePage = () => {

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch();
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const theme = useSelector(state => state.theme);
    
    let [ currentPage, setCurrentPage ] = useState(1);
    let [ selectedSortOption, setSelectedSortOption ] = useState(undefined);
    
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const searchResult = useSelector(state => state.searchResult);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // const filteredResult = [];
    // const doubleFilteredResult = [];
    // const toOrderResult = [];
    // const sortedResult = searchResult.sort((p1, p2) => (p1.healthScore < p2.healthScore) ? 1 : (p1.healthScore > p2.healthScore ? -1 : 0));

    const sortFunctions = {
        'Health Score - des.': (a, b) => a.healthScore - b.healthScore,
        'Health Score - asc.': (a, b) => b.healthScore - a.healthScore,
        'Name - asc.': (a, b) => ((a.name || a.title) && (b.name || b.title)) ? (a.name || a.title).localeCompare(b.name || b.title) : 0,
        'Name - des.': (a, b) => ((a.name || a.title) && (b.name || b.title)) ? (b.name || b.title).localeCompare(a.name || a.title) : 0,
    };
      
    const sortedResult = selectedSortOption ? searchResult.slice().sort(sortFunctions[selectedSortOption]) : searchResult;
      
      

    const paginatedResult = sortedResult.slice(((currentPage * 9) - 9), (currentPage * 9));

    useEffect( () => {
        ///////////////////////////////////////////////////////////////////////////////////////////////
       dispatch(search());
       ////////////////////////////////////////////////////////////////////////////////////////////////
    // eslint-disable-next-line
    }, []);

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

    /////////////////////////////////// go to top button /////////////////////////////////////////////
    const [showButton, setShowButton] = useState(false);
    const handleScroll = () => {
        if (window.pageYOffset > 300) {
        setShowButton(true);
        } else {
        setShowButton(false);
        }
    };
    const handleButtonClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('scroll', handleScroll);
    ////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className={ theme ? styles.light : styles.dark}>

            <button onClick={pageDecrement}>-</button>
            <span>{`     ${currentPage}     `}</span>
            <button onClick={pageIncrement}>+</button>

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

            {showButton && (<button onClick={handleButtonClick}>Go to top</button>)}

        </div>
    );
};

export default HomePage;