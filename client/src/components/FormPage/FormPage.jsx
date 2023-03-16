//import styles from './FormPage.module.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addRecipe } from '../../redux/actions';

const FormPage = () => {

    const dispatch = useDispatch();

    const [ newRecipe, setNewRecipe ] = useState({
        name: '',
        image: '',
        summary: '',
        healthScore: 0,
        instructions: '',

    });
    
    const handleChange = (event) => {
      
        setNewRecipe({
            ...newRecipe,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        dispatch(addRecipe(newRecipe))
        window.alert('Se ha agregado tu receta correctamente')
        setNewRecipe({
            name: '',
            image: '',
            summary: '',
            healthScore: 0,
            instructions: '',
            
        });
    };

    
    return (
        <form onSubmit={handleSubmit}>
    
            <label>Name: </label>
            <input type='text' name='name' onChange={handleChange} value={newRecipe.name} />
      
            <label>Image: </label>
            <input type='text' name='image' onChange={handleChange} value={newRecipe.image} />
      
            <label>Summary: </label>
            <input type='text' name='summary' onChange={handleChange} value={newRecipe.summary} />
      
            <label>Health Score: </label>
            <input type='text' name='healthScore' onChange={handleChange} value={newRecipe.healthScore} />
      
            <label>Instructions: </label>
            <input type='text' name='instructions' onChange={handleChange} value={newRecipe.instructions} />

            <label>Diets: </label>
            {/* <input type='text' name='diets' onChange={handleChange} value={newRecipe.diets} /> */}

            <button type='submit'>Agregar receta</button>

        </form>
    );
};

export default FormPage;








  
  
  

