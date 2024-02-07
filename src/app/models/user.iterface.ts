import { Menu } from "./menu.model";

export interface LoginResp {
    cod: string,
    message: string
    user: User,
    menu: Menu,
    authorization: string
}

export interface User {
    id_usuario?: number,
    fullname: string,
    nombre_usuario: string,
    apellido_usuario: string,
    cedula_usuario: string,
    correo_usuario: string,
    rol_usuario: number,
    iniciales: string,
    uservoto?: boolean,
    matriculado?: boolean | null,
    userestudiante?: boolean | null,
    pass_usuario?: string,
    vota?: boolean
    tiemposesion?: number,
    nrol?: string
}

export const userDefault: User = {
    fullname: '',
    nombre_usuario: '',
    apellido_usuario: '',
    cedula_usuario: '',
    correo_usuario: '',
    rol_usuario: undefined,
    iniciales: ''
}

export interface permisosSistema {
    crear: boolean,
    editar: boolean,
    elminar: boolean
}