import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-index-review',
  templateUrl: './index-review.component.html',
  styleUrls: ['./index-review.component.scss']
})
export class IndexReviewComponent implements OnInit {

  public token:any;
  public id:any;
  public review: Array<any> = [];
  public page: number = 1;
  public pageSize = '4';
  public load_data: Boolean = true;

  constructor(
    private _clientService: ClientService
  ) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
    this.load_data =true;
    this._clientService.get_review_cliente(this.id,this.token).subscribe(
      next=>{
        this.review = next.data
        this.load_data =false;

      }
    )
   }

  ngOnInit(): void {
  }

}
