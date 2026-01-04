import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PermissionService } from 'src/app/shared/services/permission.service';
import Permissions from '../../../shared/enums/permissions.enum';
import { HomeService } from '../../services/home.service';
import { GenericPageFluent } from 'src/app/shared/fluents/genericPage.fluent';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericTableFluent } from 'src/app/shared/fluents/genericTable.fluent';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ngOnInit() {
  }
}
