import { Injectable } from '@angular/core';
import { UrlSerializer, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(private serializer: UrlSerializer, private router: Router) { }

  getQueryString(params) {
    const tree = this.router.createUrlTree([''], { queryParams: params });
    return this.serializer.serialize(tree).slice(1);
  }

  encrypt(data: any) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), 'zhTwn8fzMLHw97Qj').toString();
  }

  decrypt(key: string) {
    if (key) {
      const resp = CryptoJS.AES.decrypt(key, 'zhTwn8fzMLHw97Qj');
      return JSON.parse(resp.toString(CryptoJS.enc.Utf8));
    }
    return '';
  }
}
