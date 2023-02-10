import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DescuentoService } from 'src/app/services/descuento.service';
declare const $: any;
declare const iziToast: any;

@Component({
  selector: 'app-create-descuento',
  templateUrl: './create-descuento.component.html',
  styleUrls: ['./create-descuento.component.scss']
})
export class CreateDescuentoComponent implements OnInit {

  public descuento: any = [];
  public imgSelected: any | ArrayBuffer = 'assets/img/01.jpg';
  public file: any = undefined;
  public token: any;
  public load_btn = false;

  constructor(
    private _descuentoService: DescuentoService,
    private _router: Router
  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
  }
  registro(registroForm: any) {
    if (registroForm.valid) {
      if (this.file == undefined) {
        iziToast.error({
          position: 'topRight',
          message: 'Debes subir un banner para registrar'

        });
      } else {
        if (this.descuento.descuento >= 1 && this.descuento.descuento <= 100) {
          this._descuentoService.registro_descuento_admin(this.descuento, this.file, this.token).subscribe(
            response => {
              iziToast.success({
                position: 'topRight',
                message: 'Se ha creado correctamente.'
              });
              this.load_btn = true;
              this._router.navigate(['/admin/descuentos']);
            },

            error => {
              this.load_btn;
            });
        } else {
          iziToast.error({
            position: 'topRight',
            message: 'Elija un descuento entre 0% y 100%'

          });
        }

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
