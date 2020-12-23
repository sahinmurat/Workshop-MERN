const {check} = require('express-validator');

exports.categoryValidation= [
    check('categoryName', 'Please enter a name minimum 2 , max 20 caracter').isLength({min:2, max:20}),

    check('description', 'Please enter a name minimum 2 , max 20 caracter').isLength({ max:200}),
]