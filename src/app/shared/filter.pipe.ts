import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], field: string, filterValue: string): any[] {
    if (value && value.length > 0) {
      console.log(value);
      return value.filter((x: any) => x[field] == filterValue);
    } else {
      console.log('pipe value not worked');
      return [];
    }
  }
}
