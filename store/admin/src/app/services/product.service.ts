import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  public url: any;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }
  registro_producto_admin(data: any, file: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': token })

    const fd = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('stock', data.stock);
    fd.append('precio', data.precio);
    fd.append('descripcion', data.descripcion);
    fd.append('contenido', data.contenido);
    fd.append('categoria', data.categoria);
    fd.append('portada', file);

    return this._http.post(this.url + 'registro_producto_admin', fd, { headers: headers });
  }

  get_producto(filtro: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'get_producto/' + filtro, { headers: headers });
  }

  get_producto_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'get_producto_admin/' + id, { headers: headers });
  }

  actualizar_producto_admin(data: any, id: any, token: any): Observable<any> {
    if (data.portada) {

      let headers = new HttpHeaders({ 'Authorization': token })

      const fd = new FormData();
      fd.append('titulo', data.titulo);
      fd.append('stock', data.stock);
      fd.append('precio', data.precio);
      fd.append('descripcion', data.descripcion);
      fd.append('contenido', data.contenido);
      fd.append('categoria', data.categoria);
      fd.append('portada', data.portada);

      return this._http.put(this.url + 'actualizar_producto_admin/' + id, fd, { headers: headers });
    } else {

      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
      return this._http.put(this.url + 'actualizar_producto_admin/' + id, data, { headers: headers });
    }
  }

  eliminar_producto_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.delete(this.url + 'eliminar_producto_admin/' + id, { headers: headers });
  }

  listar_inventario_producto_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + 'listar_inventario_producto_admin/' + id, { headers: headers });
  }

  Eliminar_inventario_producto_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.delete(this.url + 'Eliminar_inventario_producto_admin/' + id, { headers: headers });
  }

  registro_inventario_producto_admin(data: any, token: any): Observable<any> {
    console.log(data);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.post(this.url + 'registro_inventario_producto_admin', data, { headers: headers });
  }

  actualizar_producto_caracteristicas_admin(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.put(this.url + 'actualizar_producto_caracteristicas_admin/' + id, data, { headers: headers });
  }
  agregar_galeria_admin(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': token })

    const fd = new FormData();
    fd.append('titulo', data._id);
    fd.append('imagen', data.imagen);

    return this._http.put(this.url + 'agregar_galeria_admin/' + id, fd, { headers: headers });
  }

  eliminar_galeria_admin(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.put(this.url + 'eliminar_galeria_admin/' + id, data, { headers: headers });
  }

  get_review_producto_publico(id: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'get_review_producto_publico/'+ id, { headers: headers });
  }
}
