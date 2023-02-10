
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Workbook } from 'exceljs';
import { saveAs as fs } from 'file-saver';



declare const jQuery: any;
declare const $: any;
declare const iziToast: any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.scss']
})
export class IndexProductoComponent implements OnInit {
  public load_data = true;
  public token: any = '';
  public productos: Array<any> = [];
  public arr_productos: Array<any> = [];
  public url: string = '';
  public filtro_titulo = '';
  public page = 1;
  public pageSize = 5;
  public load_btn = false;

  constructor(
    private _productoService: ProductoService,

  ) {
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {

    this._productoService.get_producto(null, this.token).subscribe(
      response => {
        this.productos = response.data;

        this.productos.forEach(element => {
          this.arr_productos.push({
            titulo: element.titulo,
            stock: element.stock,
            precio: element.precio,
            categoria: element.categoria,
            nventas: element.nventas,
            portada: element.portada

          })
        })

        this.load_data = false;
      },
      error => {
        console.log(error);
      }
    )
  }

  separator(numb: number) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return str.join(".");
  }

  filtrar() {
    let filtro = this.filtro_titulo;
    if (filtro) {
      this._productoService.get_producto(filtro, this.token).subscribe(
        response => {
          this.productos = response.data;
          this.load_data = false;
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this.init_data();
    }
  }

  eliminar(id: any) {
    this.load_btn = true;
    this._productoService.eliminar_producto_admin(id, this.token).subscribe(
      response => {
        iziToast.success({
          position: 'topRight',
          message: 'Se ha eliminado correctamente'
        });

        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.load_btn = false;

        this.init_data();
      },
      error => {
        iziToast.success({
          position: 'topRight',
          message: 'Ocurrio un error en el servidor'
        });
        this.load_btn = false;
      }
    )

  }

  download_excel() {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('reporte de productos');

    worksheet.addRow(undefined);

    for (const x1 of this.arr_productos) {
      const x2 = Object.keys(x1);

      let temp = [];

      for (const y of x2) {
        temp.push(x1[y]);
      }

      worksheet.addRow(temp);
    }
    const fname = 'REP01- ';

    worksheet.columns = [
      { header: 'Producto', key: 'col1', width: 30 },
      { header: 'Stock', key: 'col2', width: 15 },
      { header: 'Precio', key: 'col3', width: 15 },
      { header: 'Categoria', key: 'col4', width: 25 },
      { header: 'Nº ventas', key: 'col4', width: 15 },
    ] as any;

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    })
  }
}

