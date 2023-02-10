import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
declare const iziToast: any;
declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: any = {};
  public usuario: any = {};
  public token: any;
  public loginInit: Boolean = true;

  constructor(
    private _clienteService: ClientService,
    private _router: Router
  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['/']);
    }
    $("#passwordToggle").click(function () {
      let type = $("#password").attr("type") === "password" ? "text" : "password";
      $("#password").attr("type", type);
    });
  }
  login(loginForm: any) {
    if (loginForm.valid) {
      let data = {
        email: this.user.email,
        password: this.user.password
      }

      this._clienteService.login_cliente(data).subscribe(
        response => {
          if (response.data == undefined) {
            iziToast.error({
              color: '#fff',
              position: 'topRight',
              message: response.message
            })
          } else {
            this.usuario = response.data;
            localStorage.setItem('token', response.token);
            localStorage.setItem('_id', this.usuario._id);

            this._router.navigate(['/']);
          }
        },
        error => { console.log(error) }

      )
    }
    else {
      iziToast.error({
        position: 'topRight',
        color: '#fff',
        message: 'Los datos del formulario no son validos'
      });
    }
  }
}

