import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClientService } from './../../../services/client.service';
import { AdminService } from 'src/app/services/admin.service';
declare const iziToast: any;

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {

  public cliente: any = {
    nombre: '',
    genero: ''
  };

  public token: any;
  public load_btn = false;

  constructor(
    private _clienteService: ClientService,
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = _adminService.getToken();
  }

  ngOnInit(): void {
  }

  registro(registroForm: any) {
    if (registroForm.valid) {

      this.load_btn = true;
      this._clienteService.registro_cliente_admin(this.cliente, this.token).subscribe(
        response => {
          console.log(response);

          iziToast.success({
            position: 'topRight',
            message: 'Se ha creado correctamente'
          });

          this.cliente = {
            nombre: '',
            apellidos: '',
            genero: '',
            f_nacimiento: '',
            telefono: '',
            dni: '',
            email: '',
          }
          this.load_btn = false;
          this._router.navigate(['/admin/clientes']);

        },
        error => {
          console.log(error);
          this.load_btn = true;
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
