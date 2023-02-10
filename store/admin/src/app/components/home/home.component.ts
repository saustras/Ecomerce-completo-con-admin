import { Chart } from 'chart.js/auto';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public token: any;
  public totalGanancias: number = 0;
  public totalmes: number = 0;
  public countVentas: number = 0;
  public totalMesAnterior: number = 0;

  constructor(
    private _adminService: AdminService

  ) {
    this.token = localStorage.getItem('token')
  }

  ngOnInit(): void {
    this._adminService.ganancias_mensuales_admin(this.token).subscribe(
      next => {
        console.log(next)
        const canvas = <HTMLCanvasElement>document.getElementById('myChart');
        const ctx = canvas.getContext('2d') || '';
        this.totalGanancias = next.totalGanancias || 0;
        this.totalmes = next.totalMes || 0;
        this.countVentas = next.countVentas || 0;
        this.totalMesAnterior = next.totalMesAnterior || 0;
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'julio', 'agosto', 'octubre', 'noviembre', 'diciembre'],
            datasets: [{
              type: 'line',
              label: 'Meses',
              data: [next.enero, next.febrero, next.marzo, next.abril, next.mayo, next.junio, next.julio, next.agosto, next.sebtiembre, next.octubre, next.noviembre, next.diciembre],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          }

        });
      }
    )

  }
  separator(n: number) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}

