import { useState } from "react";
import { useDispatch } from "react-redux";
import { addRecipe } from '../../redux/actions';

import styles from './FormPage.module.css';

import validation from './validation';

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

    const [ errors, setErrors ] = useState({});

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
        event.preventDefault();

        //check if user add custo diets and add to diets array before dispatch, then clean the other diets input box so the user can continue adding more custom diets
        if (newDiet) {
            setNewRecipe({
                ...newRecipe,
                diets: [...newRecipe.diets, newDiet]
            });
            setNewDiet('');
        }

        //pass to validation f() once the data package is ready in var newRecipe - errors will be logged on errors object
        let aux = validation(newRecipe);
        setErrors(aux);
        if ((Object.keys(aux).length) !== 0) {
            alert('validation error/s');
            return;
        }

        // if there is no errors on the process of validation
        if (Object.keys(aux).length === 0) {
            //action dispatch - crate new recipe in DB
            dispatch(addRecipe(newRecipe));
            //confirm to the user 
            alert('Recipe created successfully');
            
            //clean local state after sending all data
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
            // clean error log local state
            setErrors({});
            return;
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formu}>

            <label>Name: </label>
            <input type='text' name='name' onChange={handleChange} value={newRecipe.name} />
            {errors.name1 && <span className={styles.errors} >{errors.name1}</span>}
            {errors.name2 && <span className={styles.errors} >{errors.name2}</span>}
            {errors.name3 && <span className={styles.errors} >{errors.name3}</span>}
            <br />

            <label>Image: </label>
            <input type='text' name='image' onChange={handleChange} value={newRecipe.image} />
            {errors.image1 && <p className={styles.errors} >{errors.image1}</p>}
            {errors.image2 && <p className={styles.errors} >{errors.image2}</p>}
            {errors.image3 && <p className={styles.errors} >{errors.image3}</p>}
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








  
  
  

