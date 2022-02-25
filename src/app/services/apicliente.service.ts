import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { Response } from '../models/response';

//variable creada para contener el encabezado de nuestro post
const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiclienteService {
  apiURL = 'https://localhost:7003/api/Cliente';
  
  constructor(
    private _http : HttpClient
  ) {}
  
  getClientes(): Observable<Response> {
    return this._http.get<Response>(this.apiURL);
  }

  addCliente(cliente: Client): Observable<Response> {
    return this._http.post<Response>(this.apiURL,cliente, httpOption);
  }


}
