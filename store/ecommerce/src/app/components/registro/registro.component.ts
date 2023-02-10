import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
declare const iziToast: any;
declare const $: any;


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

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
    $("#passwordRepeatToggle").click(function () {
      let type = $("#repeatPassword").attr("type") === "password" ? "text" : "password";
      $("#repeatPassword").attr("type", type);
    });


  }
  registro(registroForm: any) {

    if (registroForm.valid) {
      if (this.user.password == this.user.repeatPassword) {
        let data = {
          nombre: this.user.nombre,
          apellidos: this.user.apellidos,
          email: this.user.email,
          password: this.user.password
        }
        this._clienteService.registro_cliente(data).subscribe(
          response => {
            if (response.data == undefined) {
              iziToast.error({
                color: '#fff',
                position: 'topRight',
                message: response.message
              })
            } else {
              this._router.navigate(['/login']);
              iziToast.success({
                color: '#fff',
                position: 'topRight',
                message: response.message
              })
            }
          },
          error => { console.log(error) }

        )

      } else {
        iziToast.error({
          position: 'topRight',
          color: '#fff',
          message: 'Las contraseñas no son iguales'
        });
      }

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
