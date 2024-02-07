export interface MenuNode {
    name: string;
    icono?: string;
    children?: itemNode[];
}

export interface itemNode {
    name: string;
    url: string;
}

export interface Menu {
    id_menu: number;
    id_rol: number;
    direccion_menu: string | null;
    id_recursivo: number | null;
    nombre_menu: string;
    icono_menu: string;
    opcion_crear: boolean;
    opcion_editar: boolean;
    opcion_eliminar: boolean;
    mostrar_menu: boolean;
    hijos?: Menu[]
}