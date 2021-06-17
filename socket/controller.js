const { comprobrarJWT } = require('../helpers')


const socketController = async ( socket ) => {

    const usuario = await comprobrarJWT( socket.handshake.headers['x-token']);
    if( !usuario ){
        socket.disconnet();
    }

    console.log( `Se conecto ${usuario.nombre}` );

}





module.exports = {
    socketController
}