let usuario = null;
let socket = null;


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


}



const main  =  async () => {    
    await validarJWT();
}




main();


//const socket = io();