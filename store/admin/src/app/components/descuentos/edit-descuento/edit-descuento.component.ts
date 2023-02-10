import { GLOBAL } from './../../../../../../ecommerce/src/app/services/GLOBAL';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DescuentoService } from 'src/app/services/descuento.service';
declare const $: any;
declare const iziToast: any;

@Component({
  selector: 'app-edit-descuento',
  templateUrl: './edit-descuento.component.html',
  styleUrls: ['./edit-descuento.component.scss']
})
export class EditDescuentoComponent implements OnInit {

  public descuento: any = [];
  public imgSelected: any | ArrayBuffer = 'assets/img/01.jpg';
  public file: any = undefined;
  public token: any;
  public load_btn = false;
  public url: string;
  public id: string = '';

  constructor(
    private _descuentoService: DescuentoService,
    private _router: Router,
    private _routerService: ActivatedRoute,
  ) {
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url
  }


  ngOnInit(): void {
    this._routerService.params.subscribe(params => {
      this.id = params['id'];

      this._descuentoService.get_descuento_admin(this.id, this.token).subscribe(
        response => {

          if (response.data == undefined) {
            this.descuento = undefined;
            console.log('entro');
          } else {

            this.descuento = response.data;
            this.imgSelected = this.url + 'get_banner/' + this.descuento.banner;
          }
        },
        error => { console.log(error); }
      );
    })
  }

  update(updateForm: any) {
    if (updateForm.valid) {
      if (this.descuento.descuento >= 1 && this.descuento.descuento <= 100) {

        const data: any = {};

        if (this.file != undefined) {
          data.banner = this.file
        }

        data.titulo = this.descuento.titulo;
        data.descuento = this.descuento.descuento;
        data.fecha_inicio = this.descuento.fecha_inicio;
        data.fecha_fin = this.descuento.fecha_fin;

        console.log(data);

        this.load_btn = true;
        this._descuentoService.actualizar_descuento_admin(data, this.id, this.token).subscribe(
          response => {
            iziToast.success({
              position: 'topRight',
              message: 'Se ha actualizado correctamente'
            });

            this._router.navigate(['/admin/descuentos']);
          },
          error => {
            this.load_btn = false
          }
        )
      } else {
        iziToast.error({
          position: 'topRight',
          message: 'Elija un descuento entre 0% y 100%'

        });
      }


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
