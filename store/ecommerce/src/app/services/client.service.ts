import jwt_decode from "jwt-decode";
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

  login_cliente(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(this.url + 'login_cliente', data, { headers: headers });
  }
  get_cLient_public(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'get_cLient_public/' + id, { headers: headers });
  }
  actualizar_cLient_public(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.put(this.url + 'actualizar_cLient_public/' + id, data, { headers: headers });
  }

  isTokenExpired(token: any) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  public isAuthenticated(): boolean {

    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      const decoded = jwt_decode(token);

      if (this.isTokenExpired(token)) {
        localStorage.clear();
        return false
      }

      if (!decoded) {
        localStorage.clear();
        return false;
      }

    } catch (error) {
      localStorage.clear();
      return false;
    }
    return true
  }
  get_config_public(): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this._http.get(this.url + 'get_config_public', { headers: headers });
  }
  get_producto_publico(filtro: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this._http.get(this.url + 'get_producto_publico/' + filtro, { headers: headers });
  }
  agregar_cart_cliente(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.post(this.url + 'agregar_cart_cliente', data, { headers: headers });
  }
  get_cart_cliente(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'get_cart_cliente/' + id, { headers: headers });
  }
  eliminar_cart_cliente(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.delete(this.url + 'eliminar_cart_cliente/' + id, { headers: headers });
  }
  direccion_registro_cliente(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.post(this.url + 'direccion_registro_cliente', data, { headers: headers });
  }
  get_direccion_all_cliente(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'get_direccion_all_cliente/' + id, { headers: headers });
  }
  get_direccion_principal_cliente(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'get_direccion_principal_cliente/' + id, { headers: headers });
  }
  update_direccion_principal_cliente(id: any, cliente: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.put(this.url + 'update_direccion_principal_cliente/' + id + '/' + cliente, { data: true }, { headers: headers });
  }
  registro_compra_cliente(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.post(this.url + 'registro_compra_cliente', data, { headers: headers });
  }
  get_ordenes_cliente(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'get_ordenes_cliente/' + id, { headers: headers });
  }
  get_detalles_orden_cliente(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'get_detalles_orden_cliente/' + id, { headers: headers });
  }
  enviar_correo_compra_cliente(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'enviar_correo_compra_cliente/' + id, { headers: headers });
  }
  actualizar_cupon_admin(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.put(this.url + 'actualizar_cupon_admin/' + id, data, { headers: headers });
  }
  validar_cupon(cupon: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'validar_cupon/' + cupon, { headers: headers });
  }
  create_review_producto_cliente(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.post(this.url + 'create_review_producto_cliente', data, { headers: headers });
  }
  get_review_producto_cliente(id: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this._http.get(this.url + 'get_review_producto_cliente/' + id, { headers: headers });
  }
  get_review_cliente(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'get_review_cliente/' + id, { headers: headers });
  }
  registro_cliente(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this._http.post(this.url + 'registro_cliente/', data, { headers: headers });
  }
}
