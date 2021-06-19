let usuario = null;
let socket = null;

const txtUid = document.querySelector('#txtUid');
const mensaje = document.querySelector('#mensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensaje = document.querySelector('#ulMensaje');
const btnSalir = document.querySelector('#btnSalir');


        const  url = ( window.location.hostname.includes('localhost') )
                    ? 'http://localhost:8081/api/auth/'
                    : 'https://restserver-curso-fher.herokuapp.com/api/auth/';



//Validar el token del local storage
const validarJWT = async () => {
    const token = localStorage.getItem( 'token' ) || '';

    if( token.length <= 10  ){
        window.Location = 'index.html';
        throw new Error(`No hay token valido en el servidor`);
    }

    const res = await fetch( url, {
        headers: {  'x-token': token }
    } );

    const { usuario: userDB, token: tokenDB } = await res.json();
    localStorage.setItem( 'token', tokenDB);
    usuario = userDB;

    document.title = usuario;

    await conectarSocket();
    
}

const conectarSocket = async () => {
    const socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on( 'connect', () => {
        console.log( 'Socket online' );
    } );


    socket.on( 'disconnect', () => {
        console.log( 'Socket offline' );
    } );

    socket.on( 'recibir-mensajes', () => {
        //TODO
    } );

    socket.on( 'usuarios-activos', ( payload ) => {
        console.log( payload );
    } );

    socket.on( 'mensaje-privado', () => {
        //TODO
    } );

}



const main  =  async () => {    
    await validarJWT();
}




main();


