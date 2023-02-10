
import { io } from 'socket.io-client';
import { ActivatedRoute } from '@angular/router';
import wNumb from 'wnumb';
import { ClientService } from 'src/app/services/client.service';
import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductService } from 'src/app/services/product.service';



declare var noUiSlider: any;
declare const jQuery: any;
declare const $: any;
declare const iziToast: any;


@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.scss']
})
export class IndexProductoComponent implements OnInit {

  public config_global: any = {};
  public filtro_categorias: any = '';
  public productos: any = {};
  public descuentoActivo: any = undefined;
  public filter_producto: any = '';
  public load_data: boolean = true;
  public url: any = '';
  public filter_cat_product = '';
  public route_categoria: string = '';
  public page = 1;
  public pageSize = '6';
  public sortby: string = '1'
  public cart: any = {};
  public btn_cart: boolean = false;
  public token: any;
  public socket = io('http://localhost:4000');

  constructor(
    private _clientService: ClientService,
    private _routerService: ActivatedRoute,
    private _productService: ProductService

  ) {
    this._clientService.get_config_public().subscribe(
      response => {
        this.config_global = response.data;

      }
    )
    this._clientService.get_producto_publico(this.filter_producto).subscribe(
      response => {
        this.productos = response.data;

      }
    )

    this._routerService.params.subscribe(
      params => {
        this.route_categoria = params['categoria'];
        this.buscar_categorias(this.route_categoria);
      }

    );
    this.url = GLOBAL.url
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {


    var slider: any = document.getElementById('slider');
    noUiSlider.create(slider, {
      start: [0, 200000],
      connect: true,
      range: {
        'min': 0,
        'max': 200000
      },
      format: wNumb({
        decimals: 0
      }),
      tooltips: [true, true],
      pips: {
        mode: 'count',
        values: 5,

      }
    })

    slider.noUiSlider.on('update', function (values: any) {
      $('.cs-range-slider-value-min').val(Math.trunc(values[0]));
      $('.cs-range-slider-value-max').val(Math.trunc(values[1]));
    });
    $('.noUi-tooltip').css('font-size', '11px');

    this._productService.get_descuento_activo().subscribe(
      response => {

        if (response.data != undefined) {
          this.descuentoActivo = response.data[0];
        } else {
          this.descuentoActivo = undefined;
        }
      }
    )
  }
  mayusprimera(str: any) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  separator(numb: number) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return str.join(".");
  }

  //busca las categorias
  buscar_categoria() {
    if (this.filtro_categorias) {
      let search = new RegExp(this.filtro_categorias, 'i');
      this.config_global.categorias = this.config_global.categorias.filter(
        (item: any) => search.test(item.titulo)
      );
    } else {
      this._clientService.get_config_public().subscribe(
        response => {
          this.config_global = response.data;
        }
      )
    }
  }
  buscar_producto() {
    this._clientService.get_producto_publico(this.filter_producto).subscribe(
      response => {
        this.productos = response.data;
        this.load_data = false;
      }
    )
  }
  buscar_precios() {
    this._clientService.get_producto_publico(this.filter_producto).subscribe(
      response => {
        this.productos = response.data;

        const min = $('.cs-range-slider-value-min').val()
        const max = $('.cs-range-slider-value-max').val()

        this.productos = this.productos.filter((item: any) => {
          return item.precio >= min && item.precio <= max
        })
      })

  }

  //filtra los productos por categorias
  buscar_categorias(filter_cat_product: any) {
    this.filter_producto = '';
    if (!filter_cat_product) {
      this._clientService.get_producto_publico(this.filter_producto).subscribe(
        response => {
          this.productos = response.data;
          this.load_data = false;
        }
      )
    } else {
      this._clientService.get_producto_publico(this.filter_producto).subscribe(
        response => {
          this.productos = response.data;
          this.productos = this.productos.filter((item: any) => item.categoria == filter_cat_product);
          this.load_data = false;
        })

    }
  }

  orderBy() {
    switch (this.sortby) {
      case '1':
        this.buscar_categorias('')
        break;

      case '2':
        this.productos.sort((a: any, b: any) => { return b.nventas - a.nventas })
        break;
      case '3':
        this.productos.sort((a: any, b: any) => { return b.precio - a.precio })
        break
      case '4':
        this.productos.sort((a: any, b: any) => { return a.precio - b.precio })
        break
      case '5':
        this.productos.sort((a: any, b: any) => {
          if (a.titulo > b.titulo) {
            return 1
          }
          if (a.titulo < b.titulo) {
            return -1
          }
          return 0
        })
        break
      case '6':
        this.productos.sort((a: any, b: any) => {
          if (a.titulo < b.titulo) {
            return 1
          }
          if (a.titulo > b.titulo) {
            return -1
          }
          return 0
        })
        break
      default:
        break;
    }
  }

  agregar_producto_cart(producto: any) {
    const data = {
      producto: producto._id,
      cliente: localStorage.getItem('_id'),
      cantidad: 1,
      caracteristicas: producto.caracteristicas[0].titulo
    }
    this.btn_cart = true;
    this._clientService.agregar_cart_cliente(data, this.token).subscribe(
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
            position: 'bottomRight',
            color: '#fff',
            message: 'Se agrego el al carrito correctamente '
          });
          this.socket.emit('agregarCarro', { data: data })
          this.btn_cart = false;
        }
      }
    )

  }


}
