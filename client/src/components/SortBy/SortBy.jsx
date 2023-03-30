import { useSelector, useDispatch } from "react-redux";

import { setSelectedSortOption } from "../../redux/actions";

import styles from './SortBy.module.css';

const SortBy = () => {

    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme);
    const selectedSortOption = useSelector(state => state.selectedSortOption);
    
    const handleSortOptionChange = (event) => {
        dispatch(setSelectedSortOption(event.target.value));
    };

    return (
        <div className={ theme ? styles.lightSort : styles.darkSort }>
            <label htmlFor="sort">Sort by:  </label>
            <select id="sort" value={selectedSortOption} onChange={handleSortOptionChange} className={styles.select} style={{outline: "none"}} >
                <option value="no sort"></option>
                <option value="Health Score - asc.">Health Score (max to min)</option>
                <option value="Health Score - des.">Health Score (min to max)</option>
                <option value="Name - asc.">Name - asc. (A to Z)</option>
                <option value="Name - des.">Name - asc. (Z to A)</option>
            </select>
        </div>
    );


};

export default SortBy;