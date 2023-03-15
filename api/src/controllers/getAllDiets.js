const { Diet } = require('../db');

const getAllDiets = async () => {
    try {
        const allDiets = await Diet.findAll();
        return allDiets;
    } catch (error) {
        return {error: error.message}
    }
};

module.exports = getAllDiets;