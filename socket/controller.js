const { comprobrarJWT } = require('../helpers');
const { ChatMensajes } = require('../models');

const chatMensajes = new ChatMensajes;


const socketController = async ( socket , io) => {

    const usuario = await comprobrarJWT( socket.handshake.headers['x-token']);
    if( !usuario ){
        socket.disconnet();
    }


    //Agregar usuario conectado
    chatMensajes.conectarUsuario( usuario );

    io.emit('usuarios-activos', chatMensajes.usuariosArr   );


    //Eliminar usuario desconectado
    socket.on( 'disconnect', () => {
        chatMensajes.desconectarUsuario( usuario.id );
        io.emit('usuarios-activos', chatMensajes.usuariosArr   );
    } );

}





module.exports = {
    socketController
}