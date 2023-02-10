import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  public url: any;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }


  get_clientes(tipo: any, filtro: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'get_cliente/' + tipo + '/' + filtro, { headers: headers });
  }
  registro_cliente_admin(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.post(this.url + 'registro_cliente_admin/', data, { headers: headers });
  }
  get_cLient_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'get_cLient_admin/' + id, { headers: headers });
  }
  actualizar_cliente_admin(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.put(this.url + 'actualizar_cliente_admin/' + id, data, { headers: headers });
  }
  eliminar_cliente_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.delete(this.url + 'eliminar_cliente_admin/' + id, { headers: headers });
  }
}
