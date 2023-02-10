import { AdminService } from 'src/app/services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-ventas',
  templateUrl: './index-ventas.component.html',
  styleUrls: ['./index-ventas.component.scss']
})
export class IndexVentasComponent implements OnInit {

  public desde:any;
  public hasta:any;
  public token:any;
  public ventas: Array<any> = [];
  public page = 1;
  public pageSize = 5;


  constructor(
    private _adminService: AdminService
  ) {
    this.token = localStorage.getItem('token')
  }

  ngOnInit(): void {
    this._adminService.get_ventas_admin(this.desde,this.hasta,this.token).subscribe(
      next =>{
        this.ventas = next.data;
      }
    )
  }

  filtrar(){
    this._adminService.get_ventas_admin(this.desde,this.hasta,this.token).subscribe(
      next =>{
        this.ventas = next.data
      }
    )
  }
  separator(n: number) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
