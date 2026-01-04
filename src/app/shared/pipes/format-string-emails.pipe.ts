import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatStringEmails'
})
export class FormatStringEmailsPipe implements PipeTransform {

  public emptyStringEmails(stringEmails: string[]): boolean {
    if (stringEmails == null || stringEmails == undefined) {
      return true
    }
    if (stringEmails.length == 0) {
      return true
    }
    return false
  }

  transform(stringEmails: string[]): any {
    if (this.emptyStringEmails(stringEmails)) {
      return '-';
    }
    let newStringEmails: string = '';
    for (let i = 0; i < stringEmails.length; i++) {
      newStringEmails += stringEmails[i] + ', ';
    }
    return newStringEmails.slice(0, newStringEmails.length - 2);
  }

}
