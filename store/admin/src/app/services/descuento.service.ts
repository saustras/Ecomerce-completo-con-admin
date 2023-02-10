import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})

export class DescuentoService {
  public url: any;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }

  get_descuento(filtro: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'get_descuento/' + filtro, { headers: headers });
  }
  eliminar_descuento_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.delete(this.url + 'eliminar_descuento_admin/' + id, { headers: headers });
  }
  get_descuento_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'get_descuento_admin/' + id, { headers: headers });
  }
  registro_descuento_admin(data: any, file: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': token })

    const fd = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('descuento', data.descuento);
    fd.append('fecha_inicio', data.fecha_inicio);
    fd.append('fecha_fin', data.fecha_fin);
    fd.append('banner', file);

    return this._http.post(this.url + 'registro_descuento_admin', fd, { headers: headers });
  }


  actualizar_descuento_admin(data: any, id: any, token: any): Observable<any> {
    if (data.banner) {

      let headers = new HttpHeaders({ 'Authorization': token })

      const fd = new FormData();
      fd.append('titulo', data.titulo);
      fd.append('descuento', data.descuento);
      fd.append('fecha_inicio', data.fecha_inicio);
      fd.append('fecha_fin', data.fecha_fin);
      fd.append('banner', data.banner);

      return this._http.put(this.url + 'actualizar_descuento_admin/' + id, fd, { headers: headers });
    } else {

      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
      return this._http.put(this.url + 'actualizar_descuento_admin/' + id, data, { headers: headers });
    }
  }
}
