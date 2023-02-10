import { Router } from '@angular/router';
import { ClientService } from './../../../services/client.service';
declare const jQuery: any;
declare const $: any;
declare const iziToast: any;


import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.scss']
})
export class IndexClienteComponent implements OnInit {

  public client: Array<any> = [];
  public filtro_apellido = '';
  public filtro_correo = '';
  public page = 1;
  public pageSize = 4;
  public token;
  public load_data = true;

  constructor(
    private _clienteService: ClientService,
    private _router: Router
  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.init_data();
  }
  init_data() {
    this._clienteService.get_clientes(null, null, this.token).subscribe(
      Response => {
        this.client = Response.data;
        this.load_data = false;
      },
      Error => {
        console.log(Error);
      }
    )
  }



  filtro(tipo: string) {
    let filtro;
    this.load_data = true;
    if (tipo === 'apellidos') {
      filtro = this.filtro_apellido;

    } else if (tipo === 'correo') {
      filtro = this.filtro_correo;
    }

    if (filtro) {
      this._clienteService.get_clientes(tipo, filtro, this.token).subscribe(
        Response => {
          this.client = Response.data;
          this.load_data = false;
        },
        Error => {
          console.log(Error);
        }
      )
    }
    else {
      this.init_data();
    }
  }

  eliminar(id: any) {
    this._clienteService.eliminar_cliente_admin(id, this.token).subscribe(
      response => {
        iziToast.success({
          title: 'success',
          class: 'textDanger',
          position: 'topRight',
          message: 'Se ha eliminado correctamente'
        });

        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.init_data();
      },
      error => {
        console.log(error);
      }
    )
  }
}
