const validation = (recipeData) => {
    let { name, image, summary, healthScore, instructions, diets } = recipeData;
    let errors = {};
    
    
    // NAME
    if (!name) {
        errors.name1 = 'This field is required';
    } // DB requirement - allowNull: false

    const regexName = /^[a-zA-Z\s]*$/;
    if (!regexName.test(name)) {
        errors.name2 = 'This field only accept alphabetical characters';
    } // developer decision - STRINGs can support any UTF-16 characters
    
    if (name.length > 255) {
        errors.name3 = 'This field support up to 255 characters long'
    } // DB requirement - type: DataTpes.STRING, by default 255 characters supported
    
    
    //IMAGE
    if (!image) {
        errors.image1 = 'This field is required';
    } // DB requirement - allowNull: false
    
    const regexImage = /\b(https?|ftp):\/\/\S+\.(jpg|jpeg|png|gif)\b/;
    if (!regexImage.test(image)) {
        errors.image2 = 'This field only accept a valid "http" or "ftp" url link to an image file (supported formats: jpg jpeg png gif)';
    } // developer decision - must be a valid link and control if the format of the file is supported
    
    if (image.length > 255) {
        errors.image3 = 'This field support up to 255 characters long'
    } // DB requirement - type: DataTpes.STRING, by default 255 characters supported
    
    
    return errors;
};

export default validation;