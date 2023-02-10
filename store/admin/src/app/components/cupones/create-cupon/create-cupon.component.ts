import { Router } from '@angular/router';
import { CuponService } from './../../../services/cupon.service';
import { Component, OnInit } from '@angular/core';


declare const iziToast: any;

@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.scss']
})
export class CreateCuponComponent implements OnInit {

  public cupon: any = {
    tipo: ''
  };
  public load_btn: any = false;
  public token: any;

  constructor(
    private _cuponService: CuponService,
    private _router: Router
  ) {
    this.token = localStorage.getItem('token')
  }

  ngOnInit(): void {
  }

  registro(registroForm: any) {
    if (registroForm.valid) {
      console.log(this.cupon);
      this._cuponService.cupon_registro_admin(this.cupon, this.token).subscribe(
        response => {
          console.log(response);
          iziToast.success({
            position: 'topRight',
            message: 'El cupon se creo correctamente'
          });
          this.load_btn = false;
          this._router.navigate(['/admin/cupones']);
        },
        error => {
          console.log(error);
        }
      )

    } else {
      iziToast.error({
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      });
      this.load_btn = true;
    }
  }
}
