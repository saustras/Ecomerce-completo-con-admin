import { io } from 'socket.io-client';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { ProductService } from 'src/app/services/product.service';
declare const iziToast: any;
declare const Cleave: any;
declare const StickySidebar: any;
declare const paypal: any;


interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @ViewChild('paypalButton', { static: true }) paypalElement: any;
  public user_local: any = undefined;
  public token: any;
  public id: any;
  public cart_data: Array<any> = [];
  public envios: Array<any> = [];
  public direccionPrincipal: any = {};
  public subtotal: any = 0;
  public url: String = '';
  public total_pagar: number = 0;
  public socket = io('http://localhost:4000');
  public descuentoActivo: any = undefined;
  public precioEnvio: string = "0";
  public venta: any = {};
  public dVenta: Array<any> = [];
  public tiendaName: string = '';
  public valorDolares: number = 0;
  public sinEnvio: number = 0;
  public descuento: number = 0;
  public errorCupon: string = '';
  public cupon: any = {};




  constructor(
    private _clienteService: ClientService,
    private _productService: ProductService,
    private _router: Router
  ) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
    this.venta.cliente = this.id
    this.url = GLOBAL.url;

    this._clienteService.get_config_public().subscribe(
      next => {
        this.tiendaName = next.data.titulo;
      }
    )

    this.user_local = JSON.parse(localStorage.getItem('user_data') || '{}');

    this._productService.datosEnvio().subscribe(
      next => {
        this.envios = next;

      }
    )
  }

  ngOnInit(): void {

    this.get_cart()
    this._productService.get_descuento_activo().subscribe(
      response => {

        if (response.data != undefined) {
          this.descuentoActivo = response.data[0];
        } else {
          this.descuentoActivo = undefined;
        }
      }

    )

    setTimeout(() => {
      var cleave = new Cleave('#cc-number', {
        creditCard: true,
        onCreditCardTypeChanged: function (type: any) {
          // update UI ...
        }
      });
      new Cleave('#cc-exp-date', {
        date: true,
        datePattern: ['m', 'y']
      });
    },);

    const sidebar = new StickySidebar('.sidebar-sticky', { topSpacing: 20 });

    this.getDireccionPrincipal();

    console.log(this.direccionPrincipal)

    paypal.Buttons({
      style: {
        layout: 'horizontal'
      },

      createOrder: (data: any, actions: any) => {

        return actions.order.create({
          purchase_units: [{
            description: 'Pago en ' + this.tiendaName,
            amount: {
              currency_code: 'USD',
              value: this.valorDolares
            },
          }]
        });

      },
      onApprove: async (data: any, actions: any) => {
        if (this.direccionPrincipal) {
          const order = await actions.order.capture();

          this.venta.transaccion = order.purchase_units[0].payments.captures[0].id
          this.venta.createdAt = Date.now;
          this.venta.detalles = this.dVenta
          this.venta.cupon = this.cupon;
          this._clienteService.actualizar_cupon_admin(this.cupon._id, this.cupon, this.token).subscribe(
            next => {
            }
          )

          this._clienteService.registro_compra_cliente(this.venta, this.token).subscribe(
            next => {
              this._clienteService.enviar_correo_compra_cliente(next.venta._id, this.token).subscribe(
                next => {
                  this._router.navigate(['/']);
                }
              )
            }
          )
        } else {
          iziToast.error({
            position: 'topRight',
            color: '#fff',
            message: 'Registre su direccion principal en su perfil.'
          });
        }
      }
      ,
      onError: (err: any) => {

      },
      onCancel: function (data: any, actions: any) {

      }
    }).render(this.paypalElement.nativeElement);


  }


  getDireccionPrincipal() {
    this._clienteService.get_direccion_principal_cliente(this.id, this.token).subscribe(
      next => {
        if (next.data == undefined) {
          this.direccionPrincipal = undefined;
        } else {
          this.direccionPrincipal = next.data;
          this.venta.direccion = this.direccionPrincipal._id;
        }
      }
    )
  }

  get_cart() {
    this._clienteService.get_cart_cliente(this.user_local._id, this.token).subscribe(
      response => {
        this.cart_data = response.data;
        this.calcularSubTotal('Envio gratis');
        this.valorDolares = Math.round(parseInt(this.subtotal) / 4600);
      }
    )
    this.sumar_cart()
  }

  separator(numb: number) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return str.join(".");
  }

  sumar_cart() {
    this.subtotal = 0;
    if (this.descuentoActivo == undefined) {
      this.cart_data.forEach(element => {
        this.subtotal = this.subtotal + parseInt(element.producto.precio)
        this.dVenta.push({
          producto: element.producto._id,
          subtotal: element.producto.precio,
          variedad: element.caracteristicas,
          cantidad: element.cantidad,
          cliente: this.id
        })
      })
    } else if (this.descuentoActivo != undefined) {
      this.cart_data.forEach(element => {
        let newPrice = Math.round(parseInt(element.producto.precio) - (parseInt(element.producto.precio) * this.descuentoActivo.descuento) / 100);
        this.dVenta.push({
          producto: element.producto._id,
          subtotal: newPrice,
          variedad: element.caracteristicas,
          cantidad: element.cantidad,
          cliente: this.id
        })
        this.subtotal = this.subtotal + newPrice;

      })

    }
  }

  eliminar_modalcart(id: any) {

    this._clienteService.eliminar_cart_cliente(id, this.token).subscribe(
      response => {

        iziToast.error({
          position: 'topRight',
          color: '#fff',
          message: 'Se elimino el producto del carrito'
        });

        this.socket.emit('delete-cart', { data: response.data });
        this.get_cart()

      }
    )
  }
  calcularSubTotal(envioTitulo: any) {
    this.dVenta = [];
    this.sumar_cart();
    this.total_pagar = this.subtotal + parseInt(this.precioEnvio) - this.descuento;
    this.sinEnvio = this.subtotal - parseInt(this.precioEnvio);
    this.venta.subtotal = this.total_pagar
    this.venta.envio_precio = parseInt(this.precioEnvio)
    this.venta.envio_titulo = envioTitulo
  }

  validarCupon() {
    if (this.venta.cupon) {
      if (this.venta.cupon.toString().length < 20) {
        this.errorCupon = ''
        this._clienteService.validar_cupon(this.venta.cupon, this.token).subscribe(
          next => {
            this.cupon = next.data;
            this.cupon.limite -= 1;
            console.log(this.cupon)
            if (next.data != undefined) {
              this.errorCupon = ''
              if (next.data.tipo == 'Valor fijo') {
                this.descuento = next.data.valor
                this.total_pagar = this.total_pagar - this.descuento;

              } else if (next.data.tipo == 'Porcentaje') {

                this.descuento = (this.subtotal * next.data.valor) / 100;
                this.total_pagar = Math.round(this.total_pagar - this.descuento);
                this.venta.subtotal = this.total_pagar;
              }

            } else {
              this.errorCupon = 'El cupon no es valido';
            }
          }
        )

      } else {
        this.errorCupon = 'El cupon debe ser menor a 20 caracteres';
      }
    } else {
      this.errorCupon = 'El cupon no es valido';
    }
  }
}
