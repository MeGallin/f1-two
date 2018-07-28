import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'grandPrix'
})
export class GrandPrixPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    for (value in args) {
      value = value.replace('Grand Prix', args);
    }
    return value;
  }

}
