import { GLOBAL } from './../../../services/GLOBAL';
import { ProductoService } from './../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare const iziToast: any;

@Component({
  selector: 'app-caracteristicas-producto',
  templateUrl: './caracteristicas-producto.component.html',
  styleUrls: ['./caracteristicas-producto.component.scss']
})
export class CaracteristicasProductoComponent implements OnInit {


  public producto: any = {};
  public token: any;
  public nueva_caracte: any;
  public id: string = '';
  public load_btn = false;
  public url: any = GLOBAL.url;


  constructor(
    public _routerService: ActivatedRoute,
    public _productoService: ProductoService,

  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this._routerService.params.subscribe(params => {
      this.id = params['id'];
      this._productoService.get_producto_admin(this.id, this.token).subscribe(
        response => {
          if (response.data == undefined) {
            this.producto = undefined;
          } else {
            this.producto = response.data;

          }
          console.log(this.producto);
        }
      );
    })
  }
  agregar_caracte() {
    if (this.nueva_caracte) {
      this.producto.caracteristicas.push({ titulo: this.nueva_caracte });
      this.nueva_caracte = '';

    } else {
      iziToast.error({
        position: 'topRight',
        message: 'El campo de la caracteristica debe ser completada.'
      });
    }
  }
  eliminar_caracte(idx: any) {
    this.producto.caracteristicas.splice(idx, 1);
  }

  actualizar() {
    if (this.producto.titulo_caracte) {
      if (this.producto.caracteristicas.length >= 1) {
        let data = {
          titulo_caracte: this.producto.titulo_caracte,
          caracteristicas: this.producto.caracteristicas
        }
        this.load_btn = true;
        this._productoService.actualizar_producto_caracteristicas_admin(this.id, data, this.token).subscribe(
          response => {
            console.log(response);
            this.load_btn = false;
            iziToast.success({
              position: 'topRight',
              message: 'Se actualizo correctamente las carracteristicas.'
            });
          }
        )
      } else {
        iziToast.error({
          position: 'topRight',
          message: 'Se debe agregar almenos una Caracteristica.'
        });
      }
    } else {
      iziToast.error({
        position: 'topRight',
        message: 'Completar el titulo de la caracteristica.'
      });
    }
  }
}


