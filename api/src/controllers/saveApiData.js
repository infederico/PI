const axios = require('axios');
const { Diet } = require('../db');

const getApiDiets = /*async*/() => {
    // aca esta el problema, no existe en la documentacion de la api un endpoint para conseguir      
    // todos los tipos de dietas disponibles - por lo tanto lo mockeo desde el archivo diets.json
    try {
        const mockApiResponse = /*await axios.get('https://api.spoonacular.com/diets')NO EXISTE*/require('../mock/diets.json');
        const allDiets = mockApiResponse.data;
        
        return allDiets;
    } catch (error) {
        return {error: error.message}
    }
};

const saveApiData = async () => {
    try {
        const allDiets = /*await*/ getApiDiets();
       
        for (let i = 0; i < allDiets.length; i++) { // son 15 tipos de dietas de la API + las que agregue el usuario
            await Diet.findOrCreate({ where: { name: allDiets[i].name } });
        }
        return;
    } catch (error) {
        return {error: error.message}
    }
};

module.exports = saveApiData;