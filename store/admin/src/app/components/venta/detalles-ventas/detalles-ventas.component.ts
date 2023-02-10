import { GLOBAL } from 'src/app/services/GLOBAL';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles-ventas',
  templateUrl: './detalles-ventas.component.html',
  styleUrls: ['./detalles-ventas.component.scss']
})
export class DetallesVentasComponent implements OnInit {

  public token: any;
  public url: any;
  public id: any;
  public orden: any = {
    envio_precio: 0,
    subtotal: 0
  };
  public detalles: Array<any> = [];
  public load_data: boolean = true;
  public totalStart: number = 5;
  public value: number = 0;
  public review: any = {};

  constructor(
    private _adminService: AdminService,
    private _route: ActivatedRoute) {
    this.token = localStorage.getItem('token')
    this.url = GLOBAL.url;
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this.init_data()
      }
    )
  }

  ngOnInit(): void {
  }
  init_data() {
    this._adminService.get_detalles_orden_cliente(this.id, this.token).subscribe(
      next => {
        if (next.data != undefined) {
          this.orden = next.data;
          this.detalles = next.detalles;
          this.load_data = false;
        } else {
          this.orden = undefined;
        }
      }
    )

  }
  separator(n: number) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

}
