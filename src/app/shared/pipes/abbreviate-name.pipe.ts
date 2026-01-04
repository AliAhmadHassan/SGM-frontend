import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviateName'
})
export class AbbreviateNamePipe implements PipeTransform {

  private MiddleName(fullName: string, firstName: string, lastName: string): string {
    return fullName.replace(firstName, '').replace(lastName, '');
  }

  private toUpperFirstLetter(text: string): string {
    let firstLetter = text[0].toUpperCase();
    let newString = firstLetter + text.slice(1).toLowerCase();
    return newString
  }

  isEmptyFullName(fullName: string) {
    if (fullName == null || fullName == undefined || fullName == '') {
      return true;
    }
    return false;
  }

  transform(fullName: string): string {
    if (this.isEmptyFullName(fullName)) {
      return '-';
    }
    fullName = fullName.trim();
    let firstName = fullName.split(' ')[0];
    firstName = this.toUpperFirstLetter(firstName);
    let lastName = fullName.split(' ')[fullName.split(' ').length - 1];
    lastName = this.toUpperFirstLetter(lastName);
    let middleName = this.MiddleName(fullName, firstName, lastName);

    let tamanhoNome = middleName.split(' ').length - 1;
    let newMiddleName = '';

    for (let i = 1; i < tamanhoNome; i++) {
      let nameSplit = middleName.split(' ')[i];
      nameSplit = this.toUpperFirstLetter(nameSplit);
      if (nameSplit.length > 3)
        newMiddleName += nameSplit[0] + '. ';
      else
        newMiddleName += nameSplit + ' ';
    }
    return firstName + ' ' + newMiddleName + ' ' + lastName;
  }

}
