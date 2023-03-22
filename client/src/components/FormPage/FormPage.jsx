import { useState } from "react";
import { useDispatch } from "react-redux";
import { addRecipe } from '../../redux/actions';

import styles from './FormPage.module.css';

const FormPage = () => {

    const dispatch = useDispatch();

    const [ newRecipe, setNewRecipe ] = useState({
        name: '',
        image: '',
        summary: '',
        healthScore: 0,
        instructions: '',
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        diets: [],
    });

    const [ newDiet, setNewDiet ] = useState('');

    const handleChange = (event) => {
        const { name, type, checked, value } = event.target;
        if (name === 'otherDetail') {
            setNewDiet(value);
        } else if (type === "checkbox") {
            setNewRecipe({
                ...newRecipe,
                diets: checked ? [...newRecipe.diets, value] : newRecipe.diets.filter(diet => diet !== value)
            })
        } else {
            setNewRecipe({
                ...newRecipe,
                [name]: value,
            });
        }
    };

    const handleClick = (event) => {
        setNewRecipe({
            ...newRecipe,
            diets: [...newRecipe.diets, newDiet]
        })
        setNewDiet('')
    };

    const handleSubmit = (event) => {
        
        if (newDiet) {
            setNewRecipe({
                ...newRecipe,
                diets: [...newRecipe.diets, newDiet]
            });
            setNewDiet('');
        }
        dispatch(addRecipe(newRecipe))
        alert('Recipe added successfully');
        event.preventDefault();
        //clean local states after sending all data to create a new recipe
        setNewRecipe({
            name: '',
            image: '',
            summary: '',
            healthScore: 0,
            instructions: '',
            vegetarian: false,
            vegan: false,
            glutenFree: false,
            diets: [],
        });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formu}>

            <label>Name: </label>
            <input type='text' name='name' onChange={handleChange} value={newRecipe.name} />
            <br />

            <label>Image: </label>
            <input type='text' name='image' onChange={handleChange} value={newRecipe.image} />
            <br />

            <label>Summary: </label>
            <input type='text' name='summary' onChange={handleChange} value={newRecipe.summary} />
            <br />

            <label>Health Score: </label>
            <input type='number' name='healthScore' onChange={handleChange} value={newRecipe.healthScore} />
            <br />

            <label>Instructions: </label>
            <input type='text' name='instructions' onChange={handleChange} value={newRecipe.instructions} />
            <br />

            <label>Diets: </label>
            <br />
            <input type='checkbox' name='vegetarian' onChange={handleChange} value='vegetarian' checked={newRecipe.diets.includes('vegetarian')} />Vegetarian 
            <input type='checkbox' name='vegan' onChange={handleChange} value='vegan' checked={newRecipe.diets.includes('vegan')} />Vegan 
            <input type='checkbox' name='glutenFree' onChange={handleChange} value='glutenFree' checked={newRecipe.diets.includes('glutenFree')} />Gluten Free
            <input type='checkbox' name='paleo' onChange={handleChange} value='paleo' checked={newRecipe.diets.includes('paleo')} />Paleo 
            <input type='checkbox' name='ketogenic' onChange={handleChange} value='ketogenic' checked={newRecipe.diets.includes('ketogenic')} />Keto 
            <input type='checkbox' name='omnivore' onChange={handleChange} value='omnivore' checked={newRecipe.diets.includes('omnivore')} />Omnivore
            <input type='checkbox' name='lacto-vegetarian' onChange={handleChange} value='lacto-vegetarian' checked={newRecipe.diets.includes('lacto-vegetarian')} />Lacto-Vegetarian
            <input type='checkbox' name='ovo-vegetarian' onChange={handleChange} value='ovo-vegetarian' checked={newRecipe.diets.includes('ovo-vegetarian')} />Ovo-Vegetarian
            <input type='checkbox' name='pescetarian' onChange={handleChange} value='pescetarian' checked={newRecipe.diets.includes('pescetarian')} />Pescetarian
            <input type='checkbox' name='lowFodmap' onChange={handleChange} value='lowFodmap' checked={newRecipe.diets.includes('lowFodmap')} />Low FODMAP
            <input type='checkbox' name='whole30' onChange={handleChange} value='whole30' checked={newRecipe.diets.includes('whole30')} />Whole30
            <input type='checkbox' name='primal' onChange={handleChange} value='primal' checked={newRecipe.diets.includes('primal')} />Primal
            <br />
            <label>other: </label>
            <input type='text' name='otherDetail' onChange={handleChange} value={newDiet} />
            <input type='button' name='other' onClick={handleClick} value='add diet' />
            <br />
            <br />

            <button type='submit'>Create recipe</button>
            <br />

        </form>
    );
};

export default FormPage;
































// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addRecipe } from '../../redux/actions';

// const FormPage = () => {

//     const dispatch = useDispatch();

//     const [ newRecipe, setNewRecipe ] = useState({
//         name: '',
//         image: '',
//         summary: '',
//         healthScore: 0,
//         instructions: '',
//         vegetarian: false,
//         vegan: false,
//         glutenFree: false,
//         diets: [],
//     });
    
//     const handleChange = (event) => {
//         if (event.target.name === 'diets') {
//             setNewRecipe({
//                 ...newRecipe,
//                 diets: [...newRecipe.diets, ...event.target.value]
//             })
//         }
//         setNewRecipe({
//             ...newRecipe,
//             [event.target.name]: event.target.value,
//         });
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
        
//         dispatch(addRecipe(newRecipe))
//         window.alert('Se ha agregado tu receta correctamente')
//         setNewRecipe({
//             name: '',
//             image: '',
//             summary: '',
//             healthScore: 0,
//             instructions: '',
            
//         });
//     };

    
//     return (
//         <form onSubmit={handleSubmit}>
    
//             <label>Name: </label>
//             <input type='text' name='name' onChange={handleChange} value={newRecipe.name} />
      
//             <label>Image: </label>
//             <input type='text' name='image' onChange={handleChange} value={newRecipe.image} />
      
//             <label>Summary: </label>
//             <input type='text' name='summary' onChange={handleChange} value={newRecipe.summary} />
      
//             <label>Health Score: </label>
//             <input type='number' name='healthScore' onChange={handleChange} value={newRecipe.healthScore} />
      
//             <label>Instructions: </label>
//             <input type='text' name='instructions' onChange={handleChange} value={newRecipe.instructions} />

//             <label>Diets: </label>
//             <input type='text' name='diets' onChange={handleChange} value={newRecipe.diets} /> 

//             <button type='submit'>Agregar receta</button>

//         </form>
//     );
// };

// export default FormPage;








  
  
  

