import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxLength'
})
export class MaxLengthPipe implements PipeTransform {

  transform(text: string, ...args: any[]): any {
    let maxLenght = 30;
    if(text)
    {
      if(text.length > maxLenght){
        text = text.slice(0,maxLenght) + '...';
      }
      return text;
    }
  }
}
