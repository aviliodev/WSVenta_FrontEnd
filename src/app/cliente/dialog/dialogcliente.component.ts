import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Client } from "src/app/models/client";
import { ApiclienteService } from "src/app/services/apicliente.service";

@Component(
    {
        templateUrl: 'dialogcliente.component.html'
    }
)

export class DialogClienteComponent {
    public nombre: string = '';
    
    constructor(
        public dialogRef: MatDialogRef<DialogClienteComponent>,
        public apiCliente: ApiclienteService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public cliente: Client
    ){
        /*Al crearse la ventana de dialogo, evalua si la data que recibió el control de dialogo (MAT_DIALOG_DATA) que se inyectó en "cliente"
        viene nula o no; si no viene nula, entonces saca el nombre de la data y lo asigna a la variable this.nombre. Como this.nombre
        está asignado con NgModel al textbox del dialogo, sirve para que al abrir el dialogo se vea el nombre del cliente en el textbox.*/
        if (this.cliente !== null){
            this.nombre = cliente.nombre;
        }
    }

    close(){
        this.dialogRef.close();
    }

    addCliente(){
        const cliente: Client = {id: 0, nombre: this.nombre}

        this.apiCliente.addCliente(cliente)
        .subscribe(response => {
            if (response.exito === 1) {
                this.close()
                this.snackBar.open('Client inserted.','', {
                    duration:2000
                })
            }
        })
    }

    editCliente(){
        const cliente: Client = {id: this.cliente.id, nombre: this.nombre}

        this.apiCliente.editCliente(cliente)
        .subscribe(response => {
            if (response.exito === 1) {
                this.close()
                this.snackBar.open('Client Updated.','', {
                    duration:2000
                })
            }
        })
    }

}