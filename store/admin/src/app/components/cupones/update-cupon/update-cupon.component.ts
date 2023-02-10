import { CuponService } from './../../../services/cupon.service';

import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare const iziToast: any;

@Component({
  selector: 'app-update-cupon',
  templateUrl: './update-cupon.component.html',
  styleUrls: ['./update-cupon.component.scss']
})
export class UpdateCuponComponent implements OnInit {

  public cupon: any = {
    tipo: ''
  };
  public load_btn: any = false;
  public token: any;
  public id: any;
  public load_data: any = true;


  constructor(
    private _routerService: ActivatedRoute,
    private _cupoService: CuponService,
    private _router: Router
  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this._routerService.params.subscribe(params => {
      this.id = params['id'];
      this._cupoService.get_cupon_admin(this.id, this.token).subscribe(
        response => {
          if (response.data == undefined) {
            this.cupon = undefined;
            this.load_data = false;
          } else {
            this.cupon = response.data
            this.load_data = false;
          }
        }
      )

    })
  }

  update(updateForm: any) {
    if (updateForm.valid) {
      this.load_btn = true;
      console.log(this.cupon);
      this._cupoService.actualizar_cupon_admin(this.id, this.cupon, this.token).subscribe(
        response => {
          iziToast.success({
            position: 'topRight',
            message: 'Se ha actualizado correctamente'
          });

          this.load_btn = false;
          this._router.navigate(['/admin/cupones']);
        }
      )
    } else {
      iziToast.error({
        title: 'Error',
        class: 'textDanger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      });
    }
  }

}
