import { GLOBAL } from './../../services/GLOBAL';
import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public config_global: any = {};
  public url: String = '';

  constructor(
    private _clienteService: ClientService,
  ) {
    this.url = GLOBAL.url
  }

  ngOnInit(): void {
    this._clienteService.get_config_public().subscribe(
      response => {
        this.config_global = response.data;
      }
    )
  }

}
