import { ProductoService } from './../../../services/product.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
const { v4: uuidv4 } = require('uuid');
declare const $: any;
declare const iziToast: any;
@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {

  public producto: any = {
    categoria: ''
  };
  public imgSelected: any | ArrayBuffer = 'assets/img/01.jpg';
  public nuevaCaracte: string = '';
  public arrayCarat: any = {
    caracteristicas: []
  };
  public file: any = undefined;
  public config: any = {};
  public token: any;
  public load_btn = false;
  public config_global: any = {}
  public id: string = '';



  constructor(
    private _productService: ProductoService,
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = this._adminService.getToken();
    this.config = {
      height: 400
    }
    this._adminService.get_config_public().subscribe(
      response => {
        this.config_global = response.data;
      }
    )

  }
  ngOnInit(): void {

  }

  registro(registroForm: any) {
    if (registroForm.valid) {
      if (this.nuevaCaracte) {
        this.arrayCarat.caracteristicas.push({ titulo: this.nuevaCaracte });
      }
      console.log(this.arrayCarat)
      if (this.file == undefined) {
        iziToast.error({
          position: 'topRight',
          message: 'Debes subir una portada para registrar'

        });
      } else {

        this._productService.registro_producto_admin(this.producto, this.file, this.token).subscribe(
          response => {
            let dataca = {
              titulo_caracte: 'tamaño',
              caracteristicas: this.arrayCarat.caracteristicas,
            }
            this._productService.actualizar_producto_caracteristicas_admin(response.data._id, dataca, this.token).subscribe(
              response => {
              })

            this.id = response.data._id
            const data = {
              imagen: this.file,
              _id: uuidv4()
            }
            this._productService.agregar_galeria_admin(this.id, data, this.token).subscribe(
              response => {
              }
            )
            iziToast.success({
              position: 'topRight',
              message: 'Se ha creado correctamente'
            });
            this.load_btn = true;
            this._router.navigate(['/admin/productos']);
          },

          error => {
            console.log(error);
          });
      }


    } else {

      iziToast.error({
        position: 'topRight',
        message: 'Los datos del formulario no son validos'

      });
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelected = 'assets/imag/01';
      this.file = undefined;
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
