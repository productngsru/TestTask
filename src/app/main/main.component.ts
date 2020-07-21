import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {isDefined, unsubscribeAll} from '../shared/utils';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  findNumber = '';
  subscription: Subscription [] = [];
  constructor( private  activateRouter: ActivatedRoute) { }

  ngOnInit() {
    this.doFindNumber();
  }
  ngOnDestroy(): void {
    unsubscribeAll(this.subscription);
  }

  private doFindNumber() {
    const subs = this.activateRouter.queryParams.subscribe(params => {
      // получаю каталог
      this.findNumber = params.findNumber;
    });
    this.subscription.push(subs);
  }
}
