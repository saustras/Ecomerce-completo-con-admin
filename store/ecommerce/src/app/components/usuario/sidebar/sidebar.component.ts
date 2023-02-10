import { Router } from '@angular/router';
import { ClientService } from './../../../services/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public token: any;
  public id: any;
  public user: any = {};
  public user_local: any = undefined;


  constructor(
    private _clienteService: ClientService,
    private _router: Router
  ) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
    if (this.token) {
      this._clienteService.get_cLient_public(this.id, this.token).subscribe(
        response => {

          this.user = response.data;
          localStorage.setItem('user_data', JSON.stringify(this.user));
          if (localStorage.getItem('user_data')) {
            this.user_local = JSON.parse(localStorage.getItem('user_data') || '{}');
          }
        }
      )
    }

  }

  ngOnInit(): void {

  }
  logout() {
    window.location.reload();
    this._router.navigate(['/'])
    localStorage.clear();

  }

}
