import { IS_LOGGED_IN_KEY, USER_KEY } from "@/constants/constants";
import { Usuario } from "@/interface/interface";

export function setLocalStorage(){
    const usuario:Usuario = {
        email: 'usuario@gmail.com',
        password: '12345678'
    } 
    localStorage.setItem(USER_KEY, JSON.stringify(usuario));
    localStorage.setItem(IS_LOGGED_IN_KEY, JSON.stringify('false'))
}

export function isLogged():boolean{
    const storage = localStorage.getItem(IS_LOGGED_IN_KEY)
    return !(storage == 'false' || storage == null)
}

export function getUser():Usuario{
    const usuario: Usuario = JSON.parse(localStorage.getItem(USER_KEY) ?? '')
    return usuario
}

export function logout(){
    localStorage.setItem(USER_KEY, JSON.stringify('false'))
}

export function login(usuario: Usuario):boolean{
    const usuarioGuardado = getUser()
    console.log(usuarioGuardado)
    console.log(usuario)
    const matches = usuarioGuardado.email === usuario.email && usuarioGuardado.password === usuario.password
    if (matches) {
        localStorage.setItem(IS_LOGGED_IN_KEY, JSON.stringify('true'))
    }
    return matches
}