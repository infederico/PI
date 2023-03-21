import styles from './SearchBar.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { search } from '../../redux/actions';

const SearchBar = () => {

  // eslint-disable-next-line
  const theme = useSelector(state => state.theme);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleOnChange = (event) => {
    setQuery(event.target.value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(search(query));
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search for recipes"
        value={query}
        onChange={handleOnChange}
        className={styles.input}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;


