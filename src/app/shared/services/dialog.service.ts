import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Dialog from '../models/dialog.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private subject = new Subject<Dialog>();

  data$ = this.subject.asObservable();

  confirm(title: string, message: string, 
          success: () => void,  icon?: string, textButton?: string, 
          cancel?: () => void, icon2?: string, textButton2?: string) {
     this.subject.next({ title, message, icon, textButton, success, icon2, textButton2, cancel });  
  }

  constructor() { }
}
