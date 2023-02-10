import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import jwt_decode from "jwt-decode";



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url: any;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }

  login_admin(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login_admin', data, { headers: headers });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getAdminUser(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'getAdminUser/' + id, { headers: headers });
  }

  isTokenExpired(token: any) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  public isAuthenticated(allowRoles: string[]): boolean {

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
        localStorage.removeItem('token');
        return false;
      }

      var decodedJson = (JSON.stringify(decoded, undefined));
    } catch (error) {
      localStorage.removeItem('token');
      return false;
    }

    const decoded = JSON.parse(decodedJson);
    return allowRoles.includes(decoded['role']);
  }
  get_config_admin(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'get_config_admin', { headers: headers });
  }
  get_logo_admin(img: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'get_logo_admin/' + img, { headers: headers });
  }

  actualizar_config_admin(id: any, data: any, token: any): Observable<any> {
    if (data.logo) {

      let headers = new HttpHeaders({ 'Authorization': token })

      const fd = new FormData();
      fd.append('titulo', data.titulo);
      fd.append('serie', data.serie);
      fd.append('correlativo', data.correlativo);
      fd.append('categorias', JSON.stringify(data.categorias));
      fd.append('logo', data.logo);

      return this._http.put(this.url + 'actualizar_config_admin/' + id, fd, { headers: headers });
    } else {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
      return this._http.put(this.url + 'actualizar_config_admin/' + id, data, { headers: headers });
    }
  }
  get_config_public(): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this._http.get(this.url + 'get_config_public', { headers: headers });
  }

  get_ventas_admin(desde: any, hasta: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'get_ventas_admin/' + desde +'/'+ hasta, { headers: headers });
  }
  get_detalles_orden_cliente(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'get_detalles_orden_cliente/' + id, { headers: headers });
  }
  ganancias_mensuales_admin( token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'ganancias_mensuales_admin', { headers: headers });
  }
}
