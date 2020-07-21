import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TestListItem} from '../../shared/test-list.service';

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.css']
})
export class ItemEditorComponent implements OnInit {
  @Input() editRecord: TestListItem;
  @Output() dialogOk = new EventEmitter();
  @Output() dialogCancel = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  submit(b: boolean) {

  }
}
