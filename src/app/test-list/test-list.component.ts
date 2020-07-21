import {Component, OnDestroy, OnInit} from '@angular/core';
import {TestListItem, TestListService} from '../shared/test-list.service';
import {Subscription} from 'rxjs';
import {unsubscribeAll} from '../shared/utils';
import {NotifyService} from '../ui/notify.service';
import {DialogService} from '../ui/dialog.service';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];
  listItems: TestListItem[];
  dtOptions: any = {};
  readonly PAGE_LENGTH = 6;
  editRecord: TestListItem;
  selectedIndex = -1;

  constructor(private testListService: TestListService,
              private dialogService: DialogService) {
  }

  private unsubscribe() {
  }

  ngOnInit() {
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: that.PAGE_LENGTH,
      searching: false,
      serverSide: true,
      processing: true,
      ordering: false,
      lengthChange: false,
      autoWidth: true,
      scrollY: '170px',
      select: true,
      selected: true,
      ajax: (dataTablesParameters: any, callback) => {
        unsubscribeAll(this.subscription);
        this.subscription.push(that.testListService.getPage(Math.ceil((dataTablesParameters.start + 1) / that.PAGE_LENGTH))
          .subscribe(resp => {
            this.selectedIndex = -1;
            that.listItems = resp.data;
            callback({
              recordsTotal: resp.total,
              recordsFiltered: resp.total,
              data: []
            });
          }));
      },
      columns: [{data: 'id'}, {data: 'email'}, {data: 'first_name'}, {data: 'last_name'}],
    };
  }

  ngOnDestroy(): void {
    unsubscribeAll(this.subscription);
  }

  onSave() {
    if (isDefined(this.editRecord.id)) {
      // Редактирвоание
      this.testListService.updateItem(this.editRecord);
      this.listItems[this.selectedIndex] = this.editRecord;

    } else {
      // Добавление
      this.selectedIndex = -1;
      this.testListService.addItem(this.editRecord);
      this.listItems.push(this.editRecord);
    }
    this.editRecord = null;
  }

  onCancel() {
    this.editRecord = null;
  }

  onAdd() {
    this.editRecord = {};
  }

  onEdit() {
    if (this.selectedIndex >= 0) {
      this.editRecord = JSON.parse(JSON.stringify(this.listItems[this.selectedIndex]));
    }
  }

  onDelete() {
      if (this.selectedIndex >= 0) { // Если что-то выбрано спрашиваю и удаляю
        this.dialogService.confirmDialog('Delete '
          + this.listItems[this.selectedIndex].last_name + ' '
          + this.listItems[this.selectedIndex].first_name  + '?', '350px',
          () => {
            // Выполняю запрос на удаление
            this.testListService.deleteItem(this.listItems[this.selectedIndex].id);
            // Сервис бутафорский, поэтому не читаю ответ, удалю сам
            this.listItems = this.listItems.filter( item => item.id !== this.listItems[this.selectedIndex].id );
            this.selectedIndex = -1;
          });
      }
  }


  selectItem(idx: number) {
    this.selectedIndex = idx;
  }
}
