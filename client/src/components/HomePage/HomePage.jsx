import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { search } from "../../redux/actions";

import styles from './HomePage.module.css';

import RecipeCard from "../RecipeCard/RecipeCard";

const HomePage = () => {

    const searchResult = useSelector(state => state.searchResult);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(search());
    }, []);

    return (
        <div className={styles.cardContainer}>
            {/* {
                searchResult?.map((result) => {
                    return <RecipeCard
                        key={result.id}
                        name={result.name}
                        image={result.image}
                        diets={result.diets}
                        />
                })
            } */}
        </div>
    );
};

export default HomePage;