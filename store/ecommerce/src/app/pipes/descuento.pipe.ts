import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descuento'
})
export class DescuentoPipe implements PipeTransform {

  transform(value: number, ...args: number[]): number {
    let descuento = Math.round(value - (value * args[0]) / 100);
    return descuento;
  }

}
