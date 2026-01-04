import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-review-archive-list',
  templateUrl: './review-archive-list.component.html',
  styleUrls: ['./review-archive-list.component.scss']
})
export class ReviewArchiveListComponent implements OnInit {

  @Input() archiveList = [];
  @Input() componentTitle: string = '';
  @Input() componentClass: string = '';

  constructor() { }

  ngOnInit() {
  }

}
