const { User } = require('../db');

const loginUser = async (userData) => {
    try {
        const { username, password } = userData;

        if(!username || !password) throw new Error('All fields are required to log in');

        //check if there is available username and email
        const user = await User.findOne({
            where: {
              username: username,
              password: password
            },
            attributes: ['id','username'] // include the password column in the result
          });
       
        if (!user) {
            throw new Error('Invalid username or password')
        };
        
        return user;
    } catch (error) {
        return {error: error.message} 
    }
};

module.exports = loginUser;