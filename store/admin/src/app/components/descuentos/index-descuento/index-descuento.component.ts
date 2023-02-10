import { GLOBAL } from 'src/app/services/GLOBAL';
import { Component, OnInit } from '@angular/core';
import { DescuentoService } from 'src/app/services/descuento.service';
declare const iziToast: any;
declare const $: any;

@Component({
  selector: 'app-index-descuento',
  templateUrl: './index-descuento.component.html',
  styleUrls: ['./index-descuento.component.scss']
})
export class IndexDescuentoComponent implements OnInit {

  public load_data = true;
  public token: any = '';
  public descuentos: Array<any> = [];
  public url: string = '';
  public filtro_titulo = '';
  public page = 1;
  public pageSize = 5;
  public load_btn = false;

  constructor(
    private _descuentoService: DescuentoService,

  ) {
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {

    this._descuentoService.get_descuento(null, this.token).subscribe(
      response => {
        this.descuentos = response.data;

        this.descuentos.forEach(element => {
          let tt_inicio = Date.parse(element.fecha_inicio + "T00:00:00") / 1000;
          let tt_fin = Date.parse(element.fecha_fin + "T00:00:00") / 1000;

          const today = Date.parse(new Date().toString()) / 1000;

          if (today > tt_fin) {
            element.estado = 'Expirado'
          }
          if (today < tt_inicio) {
            element.estado = 'Proximamente'
          }
          if (today >= tt_inicio && today <= tt_fin) {
            element.estado = 'En progreso'
          }
        })

        this.load_data = false;

      }
    )
  }

  filtrar() {
    let filtro = this.filtro_titulo;
    if (filtro) {
      this._descuentoService.get_descuento(filtro, this.token).subscribe(
        response => {
          this.descuentos = response.data;
          this.load_data = false;
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this.init_data();
    }
  }
  eliminar(id: any) {
    this.load_btn = true;
    this._descuentoService.eliminar_descuento_admin(id, this.token).subscribe(
      response => {
        iziToast.success({
          position: 'topRight',
          message: 'Se ha eliminado correctamente'
        });

        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.load_btn = false;

        this.init_data();
      },
      error => {
        iziToast.error({
          position: 'topRight',
          message: 'Ocurrio un error en el servidor'
        });
        this.load_btn = false;
      }
    )

  }
  separator(numb: number) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return str.join(".");
  }

}
