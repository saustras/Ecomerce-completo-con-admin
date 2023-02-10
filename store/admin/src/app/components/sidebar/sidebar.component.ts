import { Router } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  public config: any = {};
  public token: any;
  public id: any;
  public user: any;
  public user_local: any;


  constructor(
    private _adminService: AdminService,
    private _router: Router

  ) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_idAdmin');
    this.user_local = JSON.parse(localStorage.getItem('user_data') || '{}');

    if (this.token) {
      this._adminService.getAdminUser(this.id, this.token).subscribe(
        response => {
          this.user = response.data;

          localStorage.setItem('user_data', JSON.stringify(this.user))
          if (localStorage.getItem('user_data') && this.user) {
            this.user_local = JSON.parse(localStorage.getItem('user_data') || '{}');
          } else {
            this.user_local = undefined;
          }
        }, error => {
          this.user = undefined;
        }
      )
    }
  }

  ngOnInit(): void {
    this._adminService.get_config_admin(this.token).subscribe(
      response => {
        this.config = response.data[0]

      }
    )
  }
  logout() {
    window.location.reload();
    this._router.navigate(['/'])
    localStorage.clear();

  }

}
