import { Router } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
declare const jQuery: any;
declare const $: any;
declare const iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: any = {};
  public usuario: any = {};
  public token: any;

  constructor(
    private _adminService: AdminService,
    private _router: Router,
  ) {
    this.token = this._adminService.getToken();

  }

  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['/']);
    }
  }

  login(loginForm: any) {

    if (loginForm.valid) {

      let data = {
        email: this.user.email,
        password: this.user.password
      }

      this._adminService.login_admin(data).subscribe(

        response => {
          if (response.data === undefined) {

            iziToast.error({
              title: 'Error',
              class: 'textDanger',
              position: 'topRight',
              message: response.message
            })
          } else {
            this.usuario = response.data;
            localStorage.setItem('token', response.token);
            localStorage.setItem('_idAdmin', this.usuario._id);
            iziToast.success({
              title: 'success',
              class: 'textDanger',
              position: 'topRight',
              message: 'Se ha iniciado correctamente'
            })
            this._router.navigate(['/']);
          }
        },
        err => { console.log('Received an error: ' + err) }

      )
    }
    else {
      iziToast.error({
        title: 'Error',
        class: 'textDanger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      });
    }
  }

}
