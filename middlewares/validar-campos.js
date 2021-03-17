const { validationResult } = require("express-validator");

const validarCampos = (req ,res ,next) =>{


    const errorres= validationResult(req);

    if(!errorres.isEmpty()){
        return res.status(400).json({
            ok :false,
            errors: errorres.mapped()
        });
    }
    next();
}

module.exports = {
    validarCampos
}