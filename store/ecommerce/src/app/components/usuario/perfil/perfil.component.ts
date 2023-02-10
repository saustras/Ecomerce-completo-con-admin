import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
declare const iziToast: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public cliente: any = {
    genero: '',
    pais: '',
  };
  public token: any;
  public id: any;



  constructor(
    private _clienteService: ClientService,
    private _router: Router
  ) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');


    if (this.token) {
      this._clienteService.get_cLient_public(this.id, this.token).subscribe(
        response => {

          this.cliente = response.data;
          this.cliente.password = '';

          if (!this.cliente.pais) {
            this.cliente.pais = '';
          }
          if (!this.cliente.genero) {
            this.cliente.genero = '';
          }
        }
      )
    }
  }

  ngOnInit(): void {
  }

  actualizar(actualizarForm: any) {
    if (actualizarForm.valid) {
      this._clienteService.actualizar_cLient_public(this.id, this.cliente, this.token).subscribe(
        response => {
          iziToast.success({
            position: 'topRight',
            color: '#fff',
            message: 'Se actualizo los datos correctamente'
          });
        },
      )

    } else {
      iziToast.error({
        position: 'topRight',
        color: '#fff',
        message: 'Faltan datos por llenar.'
      });
    }
  }
}
