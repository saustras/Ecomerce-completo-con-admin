import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/product.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

@Component({
  selector: 'app-reviews-producto',
  templateUrl: './reviews-producto.component.html',
  styleUrls: ['./reviews-producto.component.scss']
})
export class ReviewsProductoComponent implements OnInit {
  public producto: any = {};
  public token: any;
  public url: any;
  public _iduser: any;
  public reviews: Array<any> = []
  public load_data = false;
  public page: number = 1;
  public pageSize = '4';




  public id: string = '';
  constructor(
    public _routerService: ActivatedRoute,
    public _productoService: ProductoService,

  ) {
    this.token = localStorage.getItem('token');
    this._iduser = localStorage.getItem('_idAdmin');
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this._routerService.params.subscribe(params => {
      this.id = params['id'];

      this._productoService.get_producto_admin(this.id, this.token).subscribe(
        response => {
          if (response.data == undefined) {
            this.producto = undefined;
          } else {
            this.producto = response.data;

            this._productoService.get_review_producto_publico(this.producto._id).subscribe(
              next => {

                this.reviews = next.data;
              }
            )
          }
        }
      );
    })
  }

}
