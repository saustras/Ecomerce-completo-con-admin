import { ProductoService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Workbook } from 'exceljs';
import { saveAs as fs } from 'file-saver';
declare const jQuery: any;
declare const $: any;
declare const iziToast: any;

@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.scss']
})
export class InventarioProductoComponent implements OnInit {

  public producto: any = {};
  public token: any;
  public _iduser: any;
  public inventario: Array<any> = []
  public arr_inventario: Array<any> = [];
  public load_btn = false;
  public inventarios: any = {}

  public id: string = '';

  constructor(
    public _routerService: ActivatedRoute,
    public _productoService: ProductoService,

  ) {
    this.token = localStorage.getItem('token');
    this._iduser = localStorage.getItem('_idAdmin')
  }

  ngOnInit(): void {
    this.init_data();

  }
  init_data() {
    this._routerService.params.subscribe(params => {
      this.id = params['id'];
      this._productoService.get_producto_admin(this.id, this.token).subscribe(
        response => {
          if (response.data == undefined) {
            this.producto = undefined;
          } else {
            this.producto = response.data;

            this._productoService.listar_inventario_producto_admin(this.producto._id, this.token).subscribe(
              response => {
                this.inventario = response.data;

                this.inventario.forEach(element => {
                  this.arr_inventario.push({
                    admin: element.admin.nombre + ' ' + element.admin.apellidos,
                    proveedor: element.proveedor,
                    cantidad: element.cantidad,
                  })
                })
              })
          }
        }
      );
    })
  }

  eliminar(id: any) {
    this.load_btn = true;
    this._productoService.Eliminar_inventario_producto_admin(id, this.token).subscribe(
      response => {

        iziToast.success({
          position: 'topRight',
          message: 'Se ha eliminado correctamente el registro.'
        });

        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.load_btn = false;

        this.init_data();
      },
      error => {
        iziToast.error({
          position: 'topRight',
          message: 'Ocurrio un error en el servidor'
        });
        this.load_btn = false;
      }
    )

  }

  registro_inventario(inventarioForm: any) {
    if (inventarioForm.valid) {
      const data = {
        producto: this.producto._id,
        cantidad: parseInt(inventarioForm.value.cantidad),
        admin: this._iduser,
        proveedor: inventarioForm.value.proveedor

      }
      this._productoService.registro_inventario_producto_admin(data, this.token).subscribe(
        response => {
          iziToast.success({
            position: 'topRight',
            message: 'Se ha ingresado el stock'
          });
          this.init_data();
          $("#inventario-cantidad").val('')
          $("#inventario-proveedor").val('')
        }
      )

    } else {

      iziToast.error({
        position: 'topRight',
        message: 'Los datos del formulario no son validos'

      });
    }
  }
  download_excel() {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('reporte de productos');

    worksheet.addRow(undefined);

    for (const x1 of this.arr_inventario) {
      const x2 = Object.keys(x1);

      let temp = [];

      for (const y of x2) {
        temp.push(x1[y]);
      }

      worksheet.addRow(temp);
    }
    const fname = 'REP01- ';

    worksheet.columns = [
      { header: 'Trabajador', key: 'col1', width: 30 },
      { header: 'cantidad', key: 'col2', width: 15 },
      { header: 'proveedor', key: 'col3', width: 25 },
    ] as any;

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    })
  }

}
