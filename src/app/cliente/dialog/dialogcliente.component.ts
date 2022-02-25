import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
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
        public snackBar: MatSnackBar
    ){}

    close(){
        this.dialogRef.close();
    }

    addCliente(){
        const cliente: Client = {nombre: this.nombre}
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
}