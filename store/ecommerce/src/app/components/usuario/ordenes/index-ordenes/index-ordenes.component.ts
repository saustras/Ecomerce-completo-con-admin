import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-index-ordenes',
  templateUrl: './index-ordenes.component.html',
  styleUrls: ['./index-ordenes.component.scss']
})
export class IndexOrdenesComponent implements OnInit {

  public url: any;
  public token: any;
  public id: any;
  public ordenes: Array<any> = [];
  public load_data: boolean = true;
  public page: number = 1;
  public pageSize = '6';

  constructor(
    private _clienteService: ClientService,
  ) {
    this.token = localStorage.getItem('token')
    this.id = localStorage.getItem('_id')
  }

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this._clienteService.get_ordenes_cliente(this.id, this.token).subscribe(
      next => {
        this.ordenes = next.data;
        this.load_data = false;
      }
    )
    this.load_data = false;
  }
  separator(n: number) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

}
