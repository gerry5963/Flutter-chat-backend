const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

const usuarioConectado=async (uid='')=>{

    const usuario = await Usuario.findById( uid );
    //console.log(usuario);
    //actualizar online 
    usuario.online = true;
    await usuario.save();
    
    //console.log(usuario);
    return usuario;

}

const usuarioDesconectado=async (uid='')=>{

    const usuario = await Usuario.findById( uid );
    //actualizar online 
    usuario.online = false;
    await usuario.save();
    
    return usuario;
}

const grabarMensaje= async( payload )=>{
        
    try {

        const mensaje = new Mensaje(payload);
        await mensaje.save();

        return true;

    }
    catch(er){

        return true;
    }

}

module.exports={
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}