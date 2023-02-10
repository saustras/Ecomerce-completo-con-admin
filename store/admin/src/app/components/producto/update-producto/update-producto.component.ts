import { GLOBAL } from './../../../services/GLOBAL';
import { ProductoService } from './../../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
const { v4: uuidv4 } = require('uuid');
declare const jQuery: any;
declare const $: any;
declare const iziToast: any;

@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.scss']
})
export class UpdateProductoComponent implements OnInit {

  public producto: any = {
    categoria: ''
  };
  public imgSelected: any | ArrayBuffer = 'assets/img/01.jpg';
  public file: any = undefined;
  public config: any = {};
  public arrayCarat: any = {
    caracteristicas: []
  };
  public token: any;
  public load_btn = false;
  public id: string = '';
  public nuevaCaracte: any = {};
  public url: any;
  public config_global: any = {};

  constructor(
    private _routerService: ActivatedRoute,
    private _productService: ProductoService,
    private _adminService: AdminService,
    private _router: Router
  ) {

    this.token = localStorage.getItem('token');
    this.config = {
      height: 400
    }
    this.url = GLOBAL.url
    this._adminService.get_config_public().subscribe(
      response => {
        this.config_global = response.data;
      }
    )
  }

  ngOnInit(): void {
    this._routerService.params.subscribe(params => {
      this.id = params['id'];
      this._productService.get_producto_admin(this.id, this.token).subscribe(
        response => {
          if (response.data == undefined) {
            this.producto = undefined;
          } else {
            this.producto = response.data;
            this.nuevaCaracte = {
              titulo: this.producto.caracteristicas[0].titulo
            }
            this.imgSelected = this.url + 'get_portada_admin/' + this.producto.portada;
          }
        },
        error => { console.log(error); }
      );
    })
  }

  actualizar(updateForm: any) {
    if (updateForm.valid) {

      const data: any = {};

      if (this.file != undefined) {
        data.portada = this.file
      }
      if (this.nuevaCaracte) {
        this.arrayCarat.caracteristicas.push(this.nuevaCaracte);
      }
      data.titulo = this.producto.titulo;
      data.stock = this.producto.stock;
      data.titulo_caracte = this.producto.titulo_caracte
      data.precio = this.producto.precio;
      data.descripcion = this.producto.descripcion;
      data.categoria = this.producto.categoria;
      data.contenido = this.producto.contenido;
      data.caracteristicas = this.arrayCarat.caracteristicas;
      console.log(data)

      this.load_btn = true;
      this._productService.actualizar_producto_admin(data, this.id, this.token).subscribe(
        response => {
          this.id = response.data._id
          const data = {
            imagen: this.file,
            _id: uuidv4()
          }
          if (data.imagen) {
            this._productService.agregar_galeria_admin(this.id, data, this.token).subscribe(
              response => {
              })
            iziToast.success({
              position: 'topRight',
              message: 'Se ha actualizado correctamente'
            });
          }

          this._router.navigate(['/admin/productos']);
        },
        error => {
          console.log(error);
          this.load_btn = false
        }
      )
    } else {
      iziToast.error({
        position: 'topRight',
        message: 'Los datos del formulario no son validos'

      });
      this.load_btn = false
    }
  }

  fileChangeEvent(event: any): void {
    let file;
    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];
      if (file.size <= 4000000) {
        if (file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/gif' || file.type === 'image/jpeg') {

          const reader = new FileReader();
          reader.onload = e => this.imgSelected = reader.result;
          reader.readAsDataURL(file);

          $('#input-portada').text(file.name);

          this.file = file;

        } else {
          iziToast.error({
            position: 'topRight',
            message: 'El archivo debe ser una imagen.'
          });
          $('#input-portada').text('Seleccionar imagen');
          this.imgSelected = 'assets/imag/01';
          this.file = undefined;
        }

      } else {
        iziToast.error({
          position: 'topRight',
          message: 'La imagen no puede superar los 4mb.'
        });
        $('#input-portada').text('Seleccionar imagen');
        this.imgSelected = 'assets/imag/01';
        this.file = undefined;
      }
    } else {
      iziToast.error({
        position: 'topRight',
        message: 'No hay una imagen de envio.'
      });
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelected = 'assets/imag/01';
      this.file = undefined;

    }

  }

}
