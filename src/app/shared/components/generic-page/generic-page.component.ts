import { Component, OnInit, Input } from '@angular/core';
import BaseResponse from '../../models/baseResponse.model';

@Component({
  selector: 'app-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.scss']
})
export class GenericPageComponent implements OnInit {
  @Input() config;

  public tableData = [];
  public total = 1;
  public page = 1;

  ngOnInit() {
    this.getData(this.page);
  }

  getData(page?) {
    this.config.requestService({ page: page || this.page, items: this.config.itemsPerPage }).subscribe((response: BaseResponse<any>) => {
      this.tableData = response.data.items;
      this.total = response.data.total;
    });
  }

}
