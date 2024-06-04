import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'input',
  standalone: true
})
export class InputPipe implements PipeTransform {
  transform(value:any,text:any): any {
    console.log('pure pipe ->',value,text);
    return value + text;
  }
}
