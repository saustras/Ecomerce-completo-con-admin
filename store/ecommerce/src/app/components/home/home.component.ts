import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ClientService } from 'src/app/services/client.service';
import { ProductService } from 'src/app/services/product.service';
declare const tns: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public descuentoActivo: any = undefined;
  public url: String = '';
  public new_productos: Array<any> = []
  public masVendidos: Array<any> = []
  public config_global: Array<any> = [];

  constructor(
    private _productService: ProductService,
    private _clienteService: ClientService
  ) {
    this.url = GLOBAL.url;


    this._clienteService.get_config_public().subscribe(
      response => {
        response.data.categorias.forEach((element: any) => {
          if (element.titulo == 'ron') {
            this.config_global.push({
              titulo: element.titulo,
              portada: '../../../assets/img/categorias/grupoRon.webp'
            })
          } else if (element.titulo == 'aguardiente') {
            this.config_global.push({
              titulo: element.titulo,
              portada: '../../../assets/img/categorias/grupoAguardiente.webp'
            })
          }
          else if (element.titulo == 'Whisky') {
            this.config_global.push({
              titulo: element.titulo,
              portada: '../../../assets/img/categorias/grupoWhisky.webp'
            })
          }
          else if (element.titulo == 'Tequila') {
            this.config_global.push({
              titulo: element.titulo,
              portada: '../../../assets/img/categorias/grupoTequila.webp'
            })
          }
          else if (element.titulo == 'cervezas') {
            this.config_global.push({
              titulo: element.titulo,
              portada: '../../../assets/img/categorias/variedad-en-cervezas.jpg'
            })
          }
        });
      }
    )
  }

  ngOnInit(): void {

    this._productService.get_descuento_activo().subscribe(
      response => {
        if (response.data != undefined) {

          this.descuentoActivo = response.data[0];
        } else {
          this.descuentoActivo = undefined;
        }
      }
    )

    this._productService.get_producto_new_publico().subscribe(
      response => {
        this.new_productos = response.data;
      }
    )
    this._productService.get_producto_masvendidos_publico().subscribe(
      response => {
        this.masVendidos = response.data;
      }
    )

    setTimeout(() => {
      tns({
        container: '.cs-carousel-inner',
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        mode: 'gallery',
        navContainer: '#pager',
        responsive: {
          0: { controls: false },
          991: { controls: true }
        }
      });

      tns({
        container: '.cs-carousel-inner-two',
        controls: false,
        responsive: {
          0: {
            gutter: 20
          },
          400: {
            items: 2,
            gutter: 20
          },
          520: {
            gutter: 30
          },
          768: {
            items: 3,
            gutter: 30
          }
        }

      });

      tns({
        container: '.cs-carousel-inner-three',
        controls: false,
        mouseDrag: !0,
        responsive: {
          0: {
            items: 1,
            gutter: 20
          },
          420: {
            items: 2,
            gutter: 20
          },
          600: {
            items: 3,
            gutter: 20
          },
          700: {
            items: 3,
            gutter: 30
          },
          900: {
            items: 4,
            gutter: 30
          },
          1200: {
            items: 5,
            gutter: 30
          },
          1400: {
            items: 6,
            gutter: 30
          }
        }


      });

      tns({
        container: '.cs-carousel-inner-four',
        nav: false,
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        controlsContainer: '#custom-controls-trending',
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

      tns({
        container: '.cs-carousel-inner-five',
        controls: false,
        gutter: 30,
        responsive: {
          0: { items: 1 },
          380: { items: 2 },
          550: { items: 3 },
          750: { items: 4 },
          1000: { items: 5 },
          1250: { items: 6 }
        }

      });

      tns({
        container: '.cs-carousel-inner-six',
        controls: false,
        gutter: 15,
        responsive: {
          0: { items: 2 },
          500: { items: 3 },
          1200: { items: 3 }
        }

      });

    }, 500);
  }
  separator(numb: number) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return str.join(".");
  }

}
