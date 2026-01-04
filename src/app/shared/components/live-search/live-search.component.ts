import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-live-search',
  templateUrl: './live-search.component.html',
  styleUrls: ['./live-search.component.scss']
})
export class LiveSearchComponent implements OnInit {
  @Input() items;
  @Input() label;
  @Input() value;
  @Input() placeHolder = 'Selecionar';
  @Output() search = new EventEmitter();
  @Output() change = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  emitSearch(event: string) {
    return this.search.emit(event);
  }

  emitChange(event: string) {
    return this.change.emit(event);
  }

}
