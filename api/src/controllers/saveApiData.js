const axios = require('axios');
const { Diet } = require('../db');

// const getApiDiets = async () => {
//     try {
//         let diets = await axios.get(`????`); 
//         // aca esta el problema, no existe en la documentacion de la api un endpoint para conseguir      
//            todos los tipos de dietas disponibles

//         return allDiets;

//     } catch (error) {
//         return {error: error.message}
//     }
// };

const saveApiData = async () => {
    try {
        //const allDiets = await getApiDiets();
        //hardcodeo de tipos de dietas para pre cargar la DB
        const allDiets = ['glutenFree', 'ketogenic', 'vegetarian', 'lacto-vegetarian', 'ovo-vegetarian', 'vegan', 'pescetarian', 'paleo', 'lowFodmap', 'whole30', 'omnivore'];
        for (let i = 0; i < allDiets.length; i++) { // son 11 tipos de dietas
            await Diet.create({ name: allDiets[i] });
        }

        return;

    } catch (error) {
        return {error: error.message}
    }
};

module.exports = saveApiData;