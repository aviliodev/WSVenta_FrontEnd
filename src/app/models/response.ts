export interface Response {
    exito: number,
    mensaje: string,
    data: [
        {
            id: number,
            nombre: string,
            venta: []
        }
    ]
}