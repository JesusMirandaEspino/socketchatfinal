const { Socket } = require('socket.io');
const { comprobrarJWT } = require('../helpers');
const { ChatMensajes } = require('../models');

const chatMensajes = new ChatMensajes;


const socketController = async( socket = new Socket(), io ) => {

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


    socket.on( 'enviar-mensaje', ( { mensaje, uid } ) => {

        chatMensajes.enviarMensaje( usuario.id, usuario.nombre, mensaje );
        io.emit( 'recibir-mensajes', chatMensajes.ultimos10 );
        
    } );

}





module.exports = {
    socketController
}