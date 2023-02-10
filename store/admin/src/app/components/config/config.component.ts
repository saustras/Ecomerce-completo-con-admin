import { GLOBAL } from './../../services/GLOBAL';
import { AdminService } from 'src/app/services/admin.service';
import { Component, OnInit } from '@angular/core';
const { v4: uuidv4 } = require('uuid');

declare const jQuery: any;
declare const $: any;
declare const iziToast: any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {


  public categorias: any = {};
  public config: any = {};
  public url: any = GLOBAL.url;
  public token: any;
  public titulo_cat: string = '';
  public icono_cat: string = '';
  public load_btn: any = false;
  public file: any = undefined;
  public imgInicial: any
  public imgSelected: any;
  public imgCateSelected: any;


  constructor(
    private _adminService: AdminService
  ) {
    this.token = _adminService.getToken();
    this._adminService.get_config_admin(this.token).subscribe(
      response => {
        this.config = response.data[0]
        this.imgSelected = this.url + 'get_logo_admin/' + this.config.logo;
        this.categorias = response.data[0].categorias
      },
      error => {
        console.log(error);
      }

    )
  }

  ngOnInit() {

  }

  updateConfig(updateConfig: any) {
    if (updateConfig.valid) {
      const data = {
        titulo: updateConfig.value.titulo,
        serie: updateConfig.value.serie,
        correlativo: updateConfig.value.correlativo,
        categorias: this.config.categorias,
        logo: this.file
      }

      this._adminService.actualizar_config_admin("63bb5b554d332db8dbd2d6b6", data, this.token).subscribe(
        response => {
          console.log(response);
          iziToast.success({
            position: 'topRight',
            message: 'Se actualizo correctamente la configuracion'
          });
        },
        error => {
          console.log(error);
        }
      )
    } else {
      iziToast.error({
        position: 'topRight',
        message: 'Complete el formulario.'
      });
      this.load_btn = true;
    }

  }

  agregar_cat() {
    if (this.titulo_cat) {
      this.categorias.push({
        titulo: this.titulo_cat,
        icono: this.imgCateSelected,
        _id: uuidv4()
      })
      console.log(this.categorias)
      this.titulo_cat = ''
      this.icono_cat = ''

    } else {
      iziToast.error({
        position: 'topRight',
        message: 'Debe ingresar un titulo e icono para la categoria.'
      });
      this.load_btn = true;
    }
  }
  fileChangeCategoria(event: any): void {
    let file;
    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];
      if (file.size <= 4000000) {
        if (file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/gif' || file.type === 'image/jpeg') {

          const reader = new FileReader();
          reader.onload = e => this.imgCateSelected = reader.result;
          reader.readAsDataURL(file);

          $('#input-portada').text(file.name);

          this.file = file;

        } else {
          iziToast.error({
            position: 'topRight',
            message: 'El archivo debe ser una imagen.'
          });
          $('#input-portada').text('Seleccionar imagen');
          this.imgCateSelected = 'assets/imag/01';
          this.file = undefined;
        }

      } else {
        iziToast.error({
          position: 'topRight',
          message: 'La imagen no puede superar los 4mb.'
        });
        $('#input-portada').text('Seleccionar imagen');
        this.imgCateSelected = 'assets/imag/01';
        this.file = undefined;
      }
    } else {
      iziToast.error({
        position: 'topRight',
        message: 'No hay una imagen de envio.'
      });
      $('#input-portada').text('Seleccionar imagen');
      this.imgCateSelected = 'assets/imag/01';
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
          $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
          $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload ');
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

  ngDoCheck(): void {
    if (this.imgInicial != this.imgSelected) {
      this.imgInicial = this.imgSelected
    }

  }
  eliminar_categoria(idx: any) {
    this.config.categorias.splice(idx, 1);
  }
}
