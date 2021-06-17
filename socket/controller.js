


const socketController = ( socket ) => {

    console.log( socket.handshake.headers['x-token'] );

}





module.exports = {
    socketController
}