import { Component, ViewChild, OnDestroy } from '@angular/core';
import Dialog from '../../models/dialog.model';
import { Subscription } from 'rxjs';
import { DialogService } from '../../services/dialog.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnDestroy {

  dialog: Dialog = {
    title: '',
    message: '',
    icon: '',
    textButton: '',
    icon2: '',
    textButton2: '',
    success: () => {},
    cancel: () => {}
  };

  subscription: Subscription;

  @ViewChild(ModalComponent, { static: true }) modal: ModalComponent;

  constructor(private dialogService: DialogService) { 
    this.subscription = dialogService.data$.subscribe(dialog => {

      this.dialog = dialog;
      this.modal.show();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
