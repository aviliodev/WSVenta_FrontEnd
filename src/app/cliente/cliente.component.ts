import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { DialogClienteComponent } from './dialog/dialogcliente.component';
import { MatDialog } from '@angular/material/dialog';
import { coerceStringArray } from '@angular/cdk/coercion';
import {Client} from '../models/client'
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})

export class ClienteComponent implements OnInit {
  public dataCliente: any[] = [];
  public columnas: string[] = ['id','nombre','actions']; //esta propiedad sirve para decirle al mat-table qué columnas mostrar
  readonly width : string = '300px';

  constructor(
    private apiCliente: ApiclienteService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this.apiCliente.getClientes().subscribe(respuesta => {
      this.dataCliente = respuesta.data;
    })
  }

  addCliente() {
    const dialogCliente = this.dialog.open(DialogClienteComponent, {
      width: this.width
    });

    /*El contro de Matdialog, referenciado por dialogCliente, permite realizar
    alguna accion despues que se cierra, en este caso, volver a traer los clientes
    para que se actualice la lista en pantalla luego de insertado.*/
    dialogCliente.afterClosed().subscribe(result =>{
      this.getClientes();
    })
  }

  editClient(cliente: Client){
    const dialogCliente = this.dialog.open(DialogClienteComponent, {
      width: this.width,
      data: cliente
    });

    dialogCliente.afterClosed().subscribe(result =>{
      this.getClientes();
    })
  }
/*Nota: para borrar, se podria mandar el id solamente o se puede mandar todo el atributo.
En este caso, se decidió que reciba todo el atributo cliente, por si se necesita mostrar el cliente antes de eliminarlo o una posibilidad asi.*/
  delClient(cliente: Client){
    const dialdeleteCliente = this.dialog.open(DialogDeleteComponent, {
      width: this.width,
      //data: cliente aqui no es necesario que el dialog reciba data, solo necesita que le mandemos el width
    });

    dialdeleteCliente.afterClosed()
    .subscribe(result =>{
      console.log(result, cliente.id);
      if (result) {
        this.apiCliente.delCliente(cliente.id)
        .subscribe(response => {
          console.log(response)
          if(response.exito === 1){
            this.snackBar.open('Client deleted','', {duration:2000});
            this.getClientes();
          }
        })
      }

    })
  }

}
