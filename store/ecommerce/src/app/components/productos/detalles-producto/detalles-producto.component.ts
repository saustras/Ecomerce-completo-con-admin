import { io } from 'socket.io-client';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ClientService } from 'src/app/services/client.service';
declare const tns: any;
declare const lightGallery: any;
declare const $: any;
declare const iziToast: any;

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.scss']
})
export class DetallesProductoComponent implements OnInit {

  public slug: string = '';
  public producto: any = {
    precio: 0
  };
  public url: any = '';
  public recomendados: Array<any> = [];
  public token: any;
  public descuentoActivo: any = undefined;
  public cart: any = {
  };
  public btn_cart = false;
  public socket = io('http://localhost:4000');
  public reviews: Array<any> = [];
  public load_data = false;
  public page: number = 1;
  public pageSize = '4';
  public five_stars: number = 0;
  public four_stars: number = 0;
  public three_stars: number = 0;
  public two_stars: number = 0;
  public one_stars: number = 0;
  public cinco_porcent: number = 0;
  public cuatro_porcent: number = 0;
  public tres_porcent: number = 0;
  public dos_porcent: number = 0;
  public uno_porcent: number = 0;
  public total_puntos: number = 0;
  public max_puntos: number = 0;
  public porcent_raiting: number = 0;
  public puntos_raiting: number = 0;
  public satisfaccion: number = 0;

  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductService,
    private _clienteService: ClientService,

  ) {
    this._route.params.subscribe(
      params => {
        this.slug = params['slug'];

        this._productService.get_producto_slug_publico(this.slug).subscribe(
          response => {
            this.producto = response.data;

            this.cart = {
              caracteristicas: this.producto.caracteristicas[0].titulo,
              cantidad: 1
            }

            this._productService.get_review_producto_publico(this.producto._id).subscribe(
              next => {
                next.data.forEach((element: any) => {

                  if (element.estrellas == 5) {
                    this.five_stars = this.five_stars + 1;
                    this.satisfaccion = this.satisfaccion + 1
                  } else if (element.estrellas == 4) {
                    this.four_stars = this.four_stars + 1;
                    this.satisfaccion = this.satisfaccion + 1
                  } else if (element.estrellas == 3) {
                    this.three_stars = this.three_stars + 1;
                  } else if (element.estrellas == 2) {
                    this.two_stars = this.two_stars + 1;
                  } else if (element.estrellas == 1) {
                    this.one_stars = this.one_stars + 1;
                  }


                  this.cinco_porcent = (this.five_stars * 100) / next.data.length;
                  this.cuatro_porcent = (this.four_stars * 100) / next.data.length;
                  this.tres_porcent = (this.three_stars * 100) / next.data.length;
                  this.dos_porcent = (this.two_stars * 100) / next.data.length;
                  this.uno_porcent = (this.one_stars * 100) / next.data.length;

                  let puntos_cinco = 0;
                  let puntos_cuatro = 0;
                  let puntos_tres = 0;
                  let puntos_dos = 0;
                  let punto_uno = 0;

                  puntos_cinco = this.five_stars * 5;
                  puntos_cuatro = this.four_stars * 4;
                  puntos_tres = this.three_stars * 3;
                  puntos_dos = this.two_stars * 2;
                  punto_uno = this.one_stars * 1;

                  this.total_puntos = puntos_cinco + puntos_cuatro + puntos_tres + puntos_dos + punto_uno;
                  this.max_puntos = next.data.length * 5;

                  this.porcent_raiting = (this.total_puntos * 100) / this.max_puntos;
                  this.puntos_raiting = (this.porcent_raiting * 5) / 100;

                });
                this.reviews = next.data;
              }
            )
            this._productService.get_producto_recomendados_publico(this.producto.categoria).subscribe(
              response => {
                this.recomendados = response.data;
              }
            )

          }
        )
      }
    )
    this.url = GLOBAL.url;
    this.token = localStorage.getItem('token')

  }

  ngOnInit(): void {

    setTimeout(() => {
      tns({
        container: '.cs-carousel-inner',
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        navPosition: "top",
        controlsPosition: "left",
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
        navContainer: "#cs-thumbnails",
        navAsThumbnails: true,
        gutter: 15,
      });
      var e = document.querySelectorAll(".cs-gallery");
      if (e.length) {
        for (var t = 0; t < e.length; t++) {
          lightGallery(e[t], { selector: ".cs-gallery-item", download: !1, videojs: !0, youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 }, vimeoPlayerParams: { byline: 0, portrait: 0 } });
        }
      }

      tns({
        container: '.cs-carousel-inner-two',
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        navPosition: "top",
        controlsPosition: "top",
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
        nav: false,
        controlsContainer: "#custom-controls-related",
        responsive: {
          0: {
            items: 1,
            gutter: 20
          },
          480: {
            items: 2,
            gutter: 24
          },
          700: {
            items: 3,
            gutter: 24
          },
          1100: {
            items: 4,
            gutter: 30
          }
        }
      });
    }, 500);

    this._productService.get_descuento_activo().subscribe(
      response => {

        if (response.data != undefined) {
          this.descuentoActivo = response.data[0];
        } else {
          this.descuentoActivo = undefined;
        }
      })

  }
  separator(numb: Number) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return str.join(".");
  }

  agregar_producto_cart() {

    if (this.cart.cantidad <= this.producto.stock) {

      const data = {
        producto: this.producto._id,
        cliente: localStorage.getItem('_id'),
        cantidad: this.cart.cantidad,
        caracteristicas: this.cart.caracteristicas
      }
      this.btn_cart = true;
      this._clienteService.agregar_cart_cliente(data, this.token).subscribe(
        response => {
          if (response.data == undefined) {
            iziToast.error({
              position: 'topRight',
              color: '#fff',
              message: 'Este producto ya existe en tu carrito'
            });
            this.btn_cart = false;
          } else {
            iziToast.success({
              position: 'topRight',
              color: '#fff',
              message: 'Se agrego el al carrito correctamente '
            });
            this.socket.emit('agregarCarro', { data: data })
            this.btn_cart = false;
          }
        }
      )

    } else {
      iziToast.error({
        position: 'topRight',
        color: '#fff',
        message: 'La cantidad maxima disponible es de ' + this.producto.stock
      });
    }
  }

}
