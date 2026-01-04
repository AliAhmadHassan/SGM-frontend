import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit {
  @Input() config;
  @Input() tableData;

  constructor() { }

  ngOnInit() { }

  isString(property){
    return typeof property === 'string';
  }

}
