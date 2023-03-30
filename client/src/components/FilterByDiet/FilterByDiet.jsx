import { useSelector, useDispatch } from 'react-redux';

import { setSelectedDiet, filterByDietAll, filterByDietVegan, filterByDietVegetarian, filterByDietGlutenfree, filterByDietCustom } from "../../redux/actions";
import { setCurrentPage } from "../../redux/actions";

import styles from './FilterByDiet.module.css';

const FilterByDiet = () => { 

    const theme = useSelector(state => state.theme);
    const diets = useSelector(state => state.diets);
    const selectedDiet = useSelector(state => state.selectedDiet);
    const dispatch = useDispatch();

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

    const handleDietChange = (event) => {
        dispatch(setSelectedDiet(event.target.value));
        filterByDietDispatcher(event.target.value);
        dispatch(setCurrentPage(1));
    };

    return (
        <div className={ theme ? styles.lightFilter : styles.darkFilter }>
            <label htmlFor="diet-filter">Filter by diet:  </label>
            <select id="diet-filter" value={selectedDiet} onChange={handleDietChange} className={styles.select} style={{outline: "none"}}> 
                <option value="all" className={styles.select}>All</option>
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
            
        </div>
    );
};

export default FilterByDiet;