import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(date: string): string {    
    if (date == null || date == '') {
      return '-';
    }
    const dataSplit = date.split('T');
    const yearMonthDay = dataSplit[0].split('-');
    return yearMonthDay[2] + '/' + yearMonthDay[1] + '/' + yearMonthDay[0];
  }

}
