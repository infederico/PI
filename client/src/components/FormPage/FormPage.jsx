import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe, cleanRecipeJustCreated, cleanBackendErrors } from '../../redux/actions';

import styles from './FormPage.module.css';

import validation from './validation';

const FormPage = () => {

    const dispatch = useDispatch();

    const recipeJustCreated = useSelector(state => state.recipeJustCreated)
    const backendErrors = useSelector(state => state.backendErrors)

    const [ newRecipe, setNewRecipe ] = useState({
        name: '',
        image: '',
        summary: '',
        healthScore: '',
        instructions: '',
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        diets: [],
    });

    const [ newDiet, setNewDiet ] = useState('');

    const [ errors, setErrors ] = useState({});

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        // reset global states that tracks recipe creation errors and success
        dispatch(cleanRecipeJustCreated());
        dispatch(cleanBackendErrors());

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
            //UX enhance - check submitted state for prevent errors to render at the first change on form - after it will allow errors rendering after first submit 
            if (submitted) setErrors(validation({ ...newRecipe, [name]: value }));
        }
    };

    const handleClick = () => {
        const newDietLowerCase = newDiet.toLowerCase();
        if (newRecipe.diets.includes(newDietLowerCase)) {
            alert('You already added this diet');
            return;
        } else {
            setNewRecipe({
                ...newRecipe,
                diets: [...newRecipe.diets, newDietLowerCase]
            })
            setNewDiet('');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // reset global states that tracks recipe creation errors and success
        dispatch(cleanRecipeJustCreated());
        //dispatch(cleanBackendErrors());

        //check if user add custom diets and add to diets array before dispatch, then clean the other diets input box so the user can continue adding more custom diets
        const newDietLowerCase = newDiet.toLowerCase();
        if (newDiet) {
            if (newRecipe.diets.includes(newDietLowerCase)) {
                return;
            } else {
                setNewRecipe({
                    ...newRecipe,
                    diets: [...newRecipe.diets, newDietLowerCase]
                });
                setNewDiet('');
            }
        }

        //pass to validation f() once the data package is ready in var newRecipe - errors will be logged on errors lcoal state
        let aux = validation(newRecipe);
        setErrors(aux);
        if ((Object.keys(aux).length) !== 0) {
            alert('Recipe not submitted. Please follow the instructions to correct data errors');
            //set submitted state in true to allow errors rendering after first submit attemp
            setSubmitted(true);
            return;
        }

        // if there is no errors on the process of validation
        if (Object.keys(aux).length === 0) {
            //action dispatch - crate new recipe in DB
            dispatch(addRecipe(newRecipe));
            //clean local state after sending all data
            setNewRecipe({
                name: '',
                image: '',
                summary: '',
                healthScore: '',
                instructions: '',
                vegetarian: false,
                vegan: false,
                glutenFree: false,
                diets: [],
            });
            // clean error log local state
            setErrors({});
            //reset the local state once the new recipe was created successfully to permit a good user experience and dont show errors until first submit attemp in the next recipe user load
            setSubmitted(false);
            
            return;
        }
    };
    
    useEffect(() => {
    
    }, [recipeJustCreated, backendErrors]);

    return (
        <form onSubmit={handleSubmit} className={styles.formu}>

            <label>Name: </label>
            <input type='text' name='name' onChange={handleChange} value={newRecipe.name} />
            {errors.name1 && <span className={styles.errors} >{errors.name1}</span>}
            {errors.name2 && <span className={styles.errors} >{errors.name2}</span>}
            {errors.name3 && <span className={styles.errors} >{errors.name3}</span>}
            {/* {errors.name4 && <span className={styles.errors} >{errors.name4}</span>} */}
            <br />

            <label>Image: </label>
            <input type='text' name='image' onChange={handleChange} value={newRecipe.image} />
            {errors.image1 && <span className={styles.errors} >{errors.image1}</span>}
            {errors.image2 && <span className={styles.errors} >{errors.image2}</span>}
            {errors.image3 && <span className={styles.errors} >{errors.image3}</span>}
            <br />

            <label>Summary: </label>
            <input type='text' name='summary' onChange={handleChange} value={newRecipe.summary} />
            {errors.summary && <span className={styles.errors} >{errors.summary}</span>}
            <br />

            <label>Health Score: </label>
            <input type='number' name='healthScore' onChange={handleChange} value={newRecipe.healthScore} />
            {errors.healthScore1 && <span className={styles.errors} >{errors.healthScore1}</span>}
            {errors.healthScore2 && <span className={styles.errors} >{errors.healthScore2}</span>}
            {errors.healthScore3 && <span className={styles.errors} >{errors.healthScore3}</span>}
            <br />

            <label>Instructions: </label>
            <input type='text' name='instructions' onChange={handleChange} value={newRecipe.instructions} />
            {errors.instructions && <span className={styles.errors} >{errors.instructions}</span>}
            <br />

            <label>Diets: </label>
            {errors.diets && <span className={styles.errors} >{errors.diets}</span>}
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

            {recipeJustCreated.name && <span className={styles.errors}>{`${recipeJustCreated.name} has been created successfully`}</span>}
            {backendErrors && <span className={styles.errors}>{`Recipe submitted but not created due server error. ${backendErrors}`}</span>}

            <button type='submit'>Create recipe</button>
            <br />
        </form>
    );
};

export default FormPage;