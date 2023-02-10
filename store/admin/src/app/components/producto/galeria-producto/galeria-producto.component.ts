import { ProductoService } from './../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from './../../../services/GLOBAL';
import { Component, OnInit } from '@angular/core';
const { v4: uuidv4 } = require('uuid');
declare const jQuery: any;
declare const $: any;
declare const iziToast: any;

@Component({
  selector: 'app-galeria-producto',
  templateUrl: './galeria-producto.component.html',
  styleUrls: ['./galeria-producto.component.scss']
})
export class GaleriaProductoComponent implements OnInit {

  public producto: any = {};
  public token: any;
  public file: any = undefined;
  public id: string = '';
  public load_btn = false;
  public url: any = GLOBAL.url;
  public load_btn_eliminar = false;

  constructor(
    public _routerService: ActivatedRoute,
    public _productoService: ProductoService,

  ) {
    this.token = localStorage.getItem('token');
  }

  init_data() {
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

  ngOnInit(): void {
    this.init_data();
  }

  fileChangeEvent(event: any): void {

    let file;
    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];
      if (file.size <= 4000000) {
        if (file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/gif' || file.type === 'image/jpeg') {


          this.file = file;

        } else {
          iziToast.error({
            position: 'topRight',
            message: 'El archivo debe ser una imagen.'
          });
          $('#input-img').val('');
          this.file = undefined;
        }

      } else {
        iziToast.error({
          position: 'topRight',
          message: 'La imagen no puede superar los 4mb.'
        });
        $('#input-img').val('');
        this.file = undefined;
      }
    } else {
      iziToast.error({
        position: 'topRight',
        message: 'No hay una imagen de envio.'
      });
      $('#input-img').val('');
      this.file = undefined;

    }

  }

  subirImagen() {
    if (this.file != undefined) {
      const data = {
        imagen: this.file,
        _id: uuidv4()
      }
      this._productoService.agregar_galeria_admin(this.id, data, this.token).subscribe(
        response => {
          this.init_data();
          $('#input-img').val('');
        }
      )
    } else {
      iziToast.error({
        position: 'topRight',
        message: 'Debe seleccionar una imagen para subir.'
      });
    }
  }
  eliminar(id: any) {
    this.load_btn_eliminar = true;
    this._productoService.eliminar_galeria_admin(this.id, { _id: id }, this.token).subscribe(
      response => {
        iziToast.success({
          position: 'topRight',
          message: 'Se ha eliminado correctamente la imagen'
        });

        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.load_btn_eliminar = false;

        this.init_data();
      },
      error => {
        iziToast.success({
          position: 'topRight',
          message: 'Ocurrio un error en el servidor'
        });
        this.load_btn = false;
      }
    )

  }

}
