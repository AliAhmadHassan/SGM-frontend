import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  alert$ = this.alert.data$;

  constructor(private alert: AlertService) { }
  
  ngOnInit() {
  }
  
  onClose() {
    this.alert.hide();
  }
}
