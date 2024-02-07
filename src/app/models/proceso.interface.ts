export interface VotacionResp {
    cod: string,
    message: string,
    VOTACION: Votacion
}

export interface Votacion {
    id_votacion: number,
    descripcion_votacion: string,
    estado_votacion: boolean,
    periodo_votacion: string,
    fecha_votacion: Date,
    listaestudiantil?: Listaestudiantil[]
}

export interface Listaestudiantil {
    id: number,
    nom_lista: string,
    descripcion: string,
    logo: string,
    estado: boolean,
    id_proceso: number,
    contenido?: string
}

export const votacionValueDefault = {
    id_votacion: undefined,
    descripcion_votacion: undefined,
    estado_votacion: undefined,
    periodo_votacion: undefined,
    fecha_votacion: undefined,
    listaestudiantil: []
}

export interface VotacionListaResp {
    cod: string,
    message: string
    votaciones: IVotacionElectoral[]
}

export interface IVotacionElectoral {
    id_votacion: number;
    descripcion_votacion: string;
    estado_votacion: boolean;
    periodo_votacion: string;
    fecha_votacion: string;
    hora_inicio: string;
    hora_final: string;
}

export interface ICandidatos {
    id_candidato: number;
    candidato: string;
    nombre_candidato: string,
    apellido_candidato: string,
    cargo_candidato: string;
    lista_candidato?: number;
}