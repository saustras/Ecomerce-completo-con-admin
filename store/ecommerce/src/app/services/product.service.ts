import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public url: any;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }
  get_producto_slug_publico(slug: string): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this._http.get(this.url + 'get_producto_slug_publico/' + slug, { headers: headers });
  }
  get_producto_recomendados_publico(categoria: string): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this._http.get(this.url + 'get_producto_recomendados_publico/' + categoria, { headers: headers });
  }
  get_descuento_activo(): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this._http.get(this.url + 'get_descuento_activo', { headers: headers });
  }
  get_producto_new_publico(): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this._http.get(this.url + 'get_producto_new_publico', { headers: headers });
  }
  get_producto_masvendidos_publico(): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this._http.get(this.url + 'get_producto_masvendidos_publico', { headers: headers });
  }
  get_ubicacion(): Observable<any> {
    return this._http.get('../../assets/colombia.json');
  }
  datosEnvio(): Observable<any> {
    return this._http.get('../../assets/datosEnvio.json');
  }
  get_review_producto_publico(id: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'get_review_producto_publico/'+ id, { headers: headers });
  }
}
