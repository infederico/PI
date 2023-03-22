const validation = (recipeData) => {
    let errors = {};

    // NAME
    const regexName = /^[a-zA-Z]*$/;
    if (!recipeData.name) {
        errors.name = 'This field is required';
    } // DB requirement - allowNull: false
    if (regexName.test(recipeData.name)) {
        errors.name = 'This field only accept alphabetical characters';
    } // developer decision - STRINGs can support any UTF-16 characters
    if (recipeData.name.length > 255) {
        errors.name = 'This field support up to 255 characters'
    } // DB requirement - type: DataTpes.STRING, by default 255 characters supported
    
    //IMAGE
    const regexImage = /\b(https?|ftp):\/\/\S+\.(jpg|jpeg|png|gif)\b/;
    if (!recipeData.image) {
        errors.image = 'This field is required';
    } // DB requirement - allowNull: false
    if (regexName.test(recipeData.name)) {
        errors.image = 'This field only accept alphabetical characters';
    } // developer decision - STRINGs can support any UTF-16 characters
    if (recipeData.image.length > 255) {
        errors.image = 'This field support up to 255 characters'
    } // DB requirement - type: DataTpes.STRING, by default 255 characters supported


    if (!recipeData.password.match(/\d/)){//reges para contiene al menos un numero
        errors.password = 'La contraseña debe contener al menos un núnero';
    }
    if (recipeData.password.length < 6 || recipeData.password.length > 10){
        errors.password = 'La contraseña debe contener entre 6 y 10 caracteres';
    }
    return errors;
};

export default validation;