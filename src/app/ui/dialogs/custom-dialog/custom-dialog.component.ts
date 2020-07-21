import {AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.scss']
})
export class CustomDialogComponent  {
  @Output() dialogCancel = new EventEmitter();
  @Output() dialogOk = new EventEmitter();
  @Input() okButtonText = 'OK';
  @Input() cancelButtonText = 'Отмена';
  @Input() width = '400px';
  @Input() top = '100px';
  @Input() okButtonType = 'button';
  @Input() cancelButtonType = 'button';
  @Input() okButtonDisabled  = false;
  @Input() useButtons = true;
  constructor() {
  }

}
