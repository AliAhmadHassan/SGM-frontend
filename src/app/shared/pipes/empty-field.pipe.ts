import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyField'
})
export class EmptyFieldPipe implements PipeTransform {

  transform(value: any): any {
    if (value == null || value == "")
      return ' - ';
    else
      return value
  }

}
