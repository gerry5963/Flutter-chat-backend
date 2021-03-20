const { io } = require('../index');
const { comprobandoJWT } = require('../helpers/jwt');
const { usuarioConectado,usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    //obetener JWT
    
    //client.handshake.headers['x-token'];
    //funcion para validar jwt
    const [valido,uid]=comprobandoJWT(client.handshake.headers['x-token']);
    //verifica cautenticacion 
    console.log(valido,uid);
    if(!valido){
        return client.disconnect();
    }
    usuarioConectado(uid);

    client.join(uid);


    client.on('mensaje-personal', async (payload)=>{
            await grabarMensaje(payload);
            io.to(payload.para).emit('mensaje-personal',payload);
    });
    //Sala Global
    //sala individual 
    /*

    client.join(uid);
    client.to(uid).emit('');
*/
    client.on('disconnect', () => {        
        usuarioDesconectado(uid);
    });

});
