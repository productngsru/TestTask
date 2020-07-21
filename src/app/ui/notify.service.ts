import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {isDefined} from '../shared/utils';

export interface  NotifyData {
  id?: number;
  type: string; // red green yellow blue
  text: string;
  time: number;
  isNew: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private idGenerator = 0;
  // tslint:disable-next-line:variable-name
  private _items = new BehaviorSubject<NotifyData[]>([]);
  private dataStore: { items: NotifyData[] } = { items: [] };
  readonly items = this._items.asObservable();
  constructor() { }

  private sendNotify(text: string, type: string) {
    const item: NotifyData = this.constructNotify(text, type);
    item.id = this.idGenerator++;
    this.dataStore.items.push(item);
    if (this.dataStore.items.length > 100) {
      this.dataStore.items.shift();
    }
    this._items.next(Object.assign({}, this.dataStore).items);
  }

  private constructNotify(text: string, type: string) {
    return {text, type, time: new Date().getTime(), isNew: true};
  }
  removeNotify(id: number) {
    const curItem = this.dataStore.items.find( item => item.id === id);
    if (isDefined(curItem)) {
      curItem.isNew = false;
    }
    this._items.next(Object.assign({}, this.dataStore).items);
  }
  removeExpired() {
    const nowTime = new Date().getTime();
    this.dataStore.items.forEach( item => {
      if (item.isNew) {
        const diff = nowTime - item.time;
        item.isNew = diff < 7000;
      }
    });
    this._items.next(Object.assign({}, this.dataStore).items);
  }

  showSuccess(msg: string) {
    this.sendNotify( msg, 'green');
  }
  showInfo(msg: string) {
    this.sendNotify( msg, 'blue');
  }
  showError(msg: string) {
    this.sendNotify(msg, 'red');
  }
  showWarn(msg: string) {
    this.sendNotify(msg, 'yellow');
  }

}
