import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ProductService } from 'src/app/services/product.service';
declare const $: any;
declare const iziToast: any

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.scss']
})
export class DireccionesComponent implements OnInit {

  public token: any;
  public id: any;
  public direccion: any = {
    departamento: '',
    ciudad: '',
    principal: false
  };

  public direcciones: Array<any> = [];
  public departamento: Array<any> = [];
  public ciudad: Array<any> = [];

  public load_data: boolean = true;


  constructor(
    private _productService: ProductService,
    private _clientService: ClientService
  ) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');

  }

  ngOnInit(): void {
    this._productService.get_ubicacion().subscribe(
      next => {
        next.forEach((element: any) => {
          this.departamento.push({
            _id: element.id,
            departamento: element.departamento,
          })
        });
      }
    );
    this.getDirecciones();
  }

  getDirecciones() {
    this.load_data = true;
    this._clientService.get_direccion_all_cliente(this.id, this.token).subscribe(
      next => {
        this.direcciones = next.data;
        this.load_data = false;
      }
    )
  }

  selectDepartamento() {
    if (this.direccion.departamento != '') {
      this.ciudad = []
      $('#sl-ciudad').prop('disabled', false);
      this._productService.get_ubicacion().subscribe(
        next => {
          next.forEach((element: any) => {
            if (element.departamento == this.direccion.departamento) {
              this.ciudad = element.ciudades
            }
          });
        }
      )
      console.log(this.direccion)
    } else {
      this.ciudad = []
    }
  }

  registrar(registroForm: any) {
    this.load_data = true;
    if (registroForm.valid) {
      const data = {
        destinatario: this.direccion.destinatario,
        dni: this.direccion.dni,
        zip: this.direccion.zip,
        direccion: this.direccion.direccion,
        telefono: this.direccion.telefono,
        departamento: this.direccion.departamento,
        ciudad: this.direccion.ciudad,
        principal: this.direccion.principal,
        cliente: this.id
      }
      this._clientService.direccion_registro_cliente(data, this.token).subscribe(
        next => {
          this.direccion = {
            destinatario: '',
            departamento: '',
            dni: '',
            zip: '',
            direccion: '',
            telefono: '',
            ciudad: '',
            principal: false
          }
          $('#sl-ciudad').prop('disabled', true);
          this.getDirecciones();
          iziToast.success({
            position: 'topRight',
            color: '#fff',
            message: 'Se agrego la direccion correctamente.'
          });
        }
      )


    } else {
      iziToast.error({
        position: 'topRight',
        color: '#fff',
        message: 'Faltan datos por llenar.'
      });
    }
  }

  updatePrincipal(id: any) {
    this._clientService.update_direccion_principal_cliente(id, this.id, this.token).subscribe(
      next => {
        iziToast.success({
          position: 'topRight',
          color: '#fff',
          message: 'Se actualizo la direccion principal.'
        });
        this.getDirecciones();
      }
    )
  }
}
