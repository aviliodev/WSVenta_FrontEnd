import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { DialogClienteComponent } from './dialog/dialogcliente.component';
import { MatDialog } from '@angular/material/dialog';
import { coerceStringArray } from '@angular/cdk/coercion';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  public dataCliente: any[] = [];
  columnas: string[] = ['id','nombre']; //esta propiedad sirve para decirle al mat-table qué columnas mostrar

  constructor(
    private apiCliente: ApiclienteService,
    public dialog: MatDialog
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
      width: '300'
    });

    /*El contro de Matdialog, referenciado por dialogCliente, permite realizar
    alguna accion despues que se cierra, en este caso, volver a traer los clientes
    para que se actualice la lista en pantalla luego de insertado.*/
    dialogCliente.afterClosed().subscribe(result =>{
      this.getClientes();
    })
  }

}
