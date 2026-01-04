import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telephoneNumber'
})
export class TelephoneNumberPipe implements PipeTransform {

  private getLastFourDigits(text: string): string {
    return text.slice(text.length - 4, text.length);
  }

  private removeLastFourDigits(text: string): string {
    return text.slice(0, text.length - 4);
  }

  private removePrefix(text: string): string {
    return text.slice(2);
  }

  private processMiddleNumber(middleNumber: string): string {
    if (middleNumber.length == 5) {
      return middleNumber[0] + ' ' + middleNumber.slice(1);
    }
    return middleNumber;
  }

  private emptyNumber(telephoneNumber: string): boolean {
    if (telephoneNumber == null || telephoneNumber == undefined || telephoneNumber == '') {
      return true;
    }
    return false;
  }

  transform(telephoneNumber: string): string {
    if(this.emptyNumber(telephoneNumber)){
      return '-';
    }
    let prefix = telephoneNumber.slice(0, 2);
    let lastFourDigits = this.getLastFourDigits(telephoneNumber);
    let middleNumber = this.removePrefix(this.removeLastFourDigits(telephoneNumber));
    middleNumber = this.processMiddleNumber(middleNumber);

    return '(' + prefix + ') ' + middleNumber + '-' + lastFourDigits;
  }
}
