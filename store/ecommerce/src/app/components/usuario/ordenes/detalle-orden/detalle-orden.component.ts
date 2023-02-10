import { GLOBAL } from './../../../../services/GLOBAL';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
declare const $: any;
declare const iziToast: any

@Component({
  selector: 'app-detalle-orden',
  templateUrl: './detalle-orden.component.html',
  styleUrls: ['./detalle-orden.component.scss']
})
export class DetalleOrdenComponent implements OnInit {

  public url: any;
  public token: any;
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
    private _clientService: ClientService,
    private _route: ActivatedRoute
  ) {

    this.token = localStorage.getItem('token');
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
    this._clientService.get_detalles_orden_cliente(this.id, this.token).subscribe(
      next => {
        if (next.data != undefined) {
          this.orden = next.data;
          console.log(next.detalles)
          next.detalles.forEach((element: any) => {
            this._clientService.get_review_producto_cliente(element.producto._id).subscribe(
              next => {
                let emitido = false;
                next.data.forEach((element_: any) => {
                  if (element_.cliente == localStorage.getItem('_id')) {
                    emitido = true;
                  }
                });
                element.estado = emitido;
              }
            );
          });
          this.detalles = next.detalles;
          this.load_data = false;
        } else {
          this.orden = undefined;
        }
      }
    )
  }

  openModal(item: any) {
    this.review = {};
    this.review.producto = item.producto._id;
    this.review.cliente = item.cliente;
    this.review.venta = this.id;
  }

  separator(n: number) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  ratioStar($event: any) {
    this.value = $event;

  }

  emitirReview(id: string) {
    if (this.review.review) {
      if (this.value && this.totalStart >= 0) {
        this.review.estrellas = this.value;

        this._clientService.create_review_producto_cliente(this.review, this.token).subscribe(
          next => {
            $('#review-' + id).modal('hide');
            $('.modal-backdrop').removeClass('show');
            iziToast.success({
              position: 'topRight',
              color: '#fff',
              message: 'Reseña creada correctamente.'
            });
            this.init_data();
          }
        )

      } else {
        iziToast.error({
          position: 'topRight',
          color: '#fff',
          message: 'Seleccione el numero de estrellas.'
        });
      }

    } else {
      iziToast.error({
        position: 'topRight',
        color: '#fff',
        message: 'Ingrese una reseña.'
      });
    }
  }

}
