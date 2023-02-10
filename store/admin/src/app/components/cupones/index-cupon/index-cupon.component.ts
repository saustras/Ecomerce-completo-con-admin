import { CuponService } from './../../../services/cupon.service';
import { Component, OnInit } from '@angular/core';
declare const jQuery: any;
declare const $: any;
declare const iziToast: any;

@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.scss']
})
export class IndexCuponComponent implements OnInit {

  public load_data: boolean = true;
  public page = 1;
  public pageSize = 4;
  public cupones: Array<any> = [];
  public filtro_codigo: String = '';
  public token: any;
  public load_btn: boolean = false;

  constructor(
    private _cuponService: CuponService,
  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this._cuponService.get_cupon(null, this.token).subscribe(
      response => {
        this.cupones = response.data;
        this.load_data = false;
      },
      error => {
        console.log(error);
      }
    )
  }

  filtrar() {
    let filtro = this.filtro_codigo;
    if (filtro) {
      this._cuponService.get_cupon(filtro, this.token).subscribe(
        response => {
          this.cupones = response.data;
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
    this._cuponService.eliminar_cupon_admin(id, this.token).subscribe(
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
        iziToast.success({
          position: 'topRight',
          message: 'Ocurrio un error en el servidor'
        });
        this.load_btn = false;
      }
    )

  }
}
