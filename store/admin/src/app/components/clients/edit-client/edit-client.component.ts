import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
declare const iziToast: any;

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  public cliente: any = {};
  public id: any;
  public token: any;
  public load_btn = false;
  public load_data = true;


  constructor(
    private _router: ActivatedRoute,
    private _clienteService: ClientService,
    private _adminService: AdminService,
    private _routerService: Router
  ) {
    this.token = _adminService.getToken();
  }

  ngOnInit(): void {
    this._router.params.subscribe(params => {
      this.id = params['id'];
      this._clienteService.get_cLient_admin(this.id, this.token).subscribe(
        response => {
          if (response.data == undefined) {
            this.cliente = undefined;
            this.load_data = false;
          } else {
            this.cliente = response.data
            this.load_data = false;
          }
        },
        error => {
          console.log(error);
        }
      )

    })
  }

  update(updateForm: any) {
    if (updateForm.valid) {
      this.load_btn = true;
      this._clienteService.actualizar_cliente_admin(this.id, this.cliente, this.token).subscribe(
        response => {
          iziToast.success({
            position: 'topRight',
            message: 'Se ha actualizado correctamente'
          });

          this.load_btn = false;
          this._routerService.navigate(['/admin/clientes']);
        },
        error => {
          console.log(error);
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
