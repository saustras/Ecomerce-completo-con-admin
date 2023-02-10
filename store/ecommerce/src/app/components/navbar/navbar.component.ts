import { GLOBAL } from 'src/app/services/GLOBAL';
import { Router } from '@angular/router';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { ProductService } from 'src/app/services/product.service';
declare const $: any;
declare const iziToast: any;



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public token: any;
  public id: any;
  public user: any = {};
  public user_local: any = undefined;
  public config_global: any = {};
  public open_cart: boolean = false;
  public cart_data: Array<any> = [];
  public url: String = '';
  public subtotal: number = 0;
  public cantidad_prod: number = 0;
  public socket = io('http://localhost:4000');
  public descuentoActivo: any = undefined;


  constructor(
    private _clienteService: ClientService,
    private _router: Router,
    private _productService: ProductService
  ) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
    this.url = GLOBAL.url

    this._clienteService.get_config_public().subscribe(
      response => {
        this.config_global = response.data;
      }
    )

    if (this.token) {
      this._clienteService.get_cLient_public(this.id, this.token).subscribe(
        response => {
          this.user = response.data;
          if (this.user == undefined) {
            this.logout()
          }
          localStorage.setItem('user_data', JSON.stringify(this.user));
          if (localStorage.getItem('user_data') && this.user) {
            this.user_local = JSON.parse(localStorage.getItem('user_data') || '{}');

            this.get_cart();

          } else {
            this.user_local = undefined;
          }
        }, error => {
          this.user = undefined;
        }
      )
    }
  }

  get_cart() {
    this._clienteService.get_cart_cliente(this.user_local._id, this.token).subscribe(
      response => {
        this.cart_data = response.data;
        this.cantidad_prod = this.cart_data.length;
        this.sumar_cart();
      }
    )

  }

  ngOnInit(): void {
    this.socket.on('delete-cart', (data) => {
      this.get_cart();

    });

    this.socket.on('new-cart-add', (data) => {
      this.get_cart();

    })

    this._productService.get_descuento_activo().subscribe(
      response => {

        if (response.data != undefined) {
          this.descuentoActivo = response.data[0];
        } else {
          this.descuentoActivo = undefined;
        }
      }
    )

    this._clienteService.isAuthenticated();
  }

  separator(numb: number) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return str.join(".");
  }



  logout() {
    window.location.reload();
    this._router.navigate(['/'])
    localStorage.clear();
  }

  open_modalcart() {
    if (!this.open_cart) {
      this.open_cart = true;
      $('#cart').addClass('show');
    } else {
      this.open_cart = false;
      $('#cart').removeClass('show');
    }
  }
  eliminar_modalcart(id: any) {
    this._clienteService.eliminar_cart_cliente(id, this.token).subscribe(
      response => {
        iziToast.success({
          position: 'topRight',
          color: '#fff',
          message: 'Se elimino el producto del carrito'
        });
        this.socket.emit('delete-cart', { data: response.data });
      }
    )
    this.get_cart();
  }

  sumar_cart() {
    this.subtotal = 0;
    if (this.descuentoActivo == undefined) {
      this.cart_data.forEach(element => {
        this.subtotal = this.subtotal + parseInt(element.producto.precio)
      })
    } else if (this.descuentoActivo != undefined) {

      this.cart_data.forEach(element => {
        let newPrice = Math.round(parseInt(element.producto.precio) - (parseInt(element.producto.precio) * this.descuentoActivo.descuento) / 100);
        this.subtotal = this.subtotal + newPrice;
      })

    }
  }
}
