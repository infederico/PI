import { useSelector, useDispatch } from 'react-redux';

import { setSelectedOrigin, filterByOriginAll, filterByOriginApi, filterByOriginDb } from "../../redux/actions";
import { setCurrentPage } from "../../redux/actions";

import styles from './FilterByOrigin.module.css';

const FilterByOrigin = () => { 

    const theme = useSelector(state => state.theme);
    const selectedOrigin = useSelector(state => state.selectedOrigin);
    const dispatch = useDispatch();

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

    const handleOriginChange = (event) => {
        dispatch(setSelectedOrigin(event.target.value));
        filterByOriginDispatcher(event.target.value);
        dispatch(setCurrentPage(1));
    };

    return (
        <div className={ theme ? styles.lightFilter : styles.darkFilter }>
            <label htmlFor="origin-filter">Filter by origin:  </label>
            <select id="origin-filter" value={selectedOrigin} onChange={handleOriginChange} className={styles.select} style={{outline: "none"}}>
                <option value="all">All</option>
                <option value="api">API</option>
                <option value="db">DB</option>
            </select>
            
        </div>
    );
};

export default FilterByOrigin;