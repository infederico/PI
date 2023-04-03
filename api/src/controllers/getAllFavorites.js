const { Favorite } = require('../db');
const { User } = require('../db');
const { Diet } = require('../db');

const getAllFavorites = async (userId) => {
    try {
        const allFavorites = await User.findOne({
            where: { id: userId },
            include: [{
              model: Favorite,
              include: [{ 
                model: Diet,
                through: { attributes: [] }
              }],
              attributes: {
                exclude: ['User_Favorite']
              }
            }],
            attributes: {
              exclude: ['password', 'createdAt', 'updatedAt']
            }
          });
          
          const favorites = allFavorites.Favorites.map(favorite => {
            const diets = favorite.Diets.map(diet => diet.name);
            return { ...favorite.toJSON(), diets: diets };
          });
          
          return { ...allFavorites.toJSON(), Favorites: favorites };
          
          

    } catch (error) {
        return { error: error.message };
    }
};

module.exports = getAllFavorites;
