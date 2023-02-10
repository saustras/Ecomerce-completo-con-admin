import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CuponService {

  public url: any;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }
  cupon_registro_admin(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.post(this.url + 'cupon_registro_admin/', data, { headers: headers });
  }
  get_cupon(filtro: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'get_cupon/' + filtro, { headers: headers });
  }
  eliminar_cupon_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.delete(this.url + 'eliminar_cupon_admin/' + id, { headers: headers });
  }
  get_cupon_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'get_cupon_admin/' + id, { headers: headers });
  }
  actualizar_cupon_admin(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.put(this.url + 'actualizar_cupon_admin/' + id, data, { headers: headers });
  }
}
