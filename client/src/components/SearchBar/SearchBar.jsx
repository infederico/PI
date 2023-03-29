import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { searchRecipe, cleanSearchError } from '../../redux/actions';

import styles from './SearchBar.module.css';
import lightSearchIcon from '../../assets/images/light-search-icon.png';
import darkSearchIcon from '../../assets/images/dark-search-icon.png';

const SearchBar = () => {

  const theme = useSelector(state => state.theme);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setQuery(event.target.value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(cleanSearchError())
    if (query) {
      dispatch(searchRecipe(query));
      setQuery('');
    } else return;
  };

  return (
    <form onSubmit={handleSubmit}>

      <div className={styles.searchContainer}>
        <input
          type='search'
          placeholder='Search for recipes...'
          value={query}
          onChange={handleChange}
          className={styles.input}
        />
        <button
          type='submit'
          title='search'
          className={styles.searchButton}>
          <img src={ theme ? lightSearchIcon : darkSearchIcon } alt='search-icon' />
        </button>
      </div>

    </form>
  );
};

export default SearchBar;