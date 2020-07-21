import { Component, OnInit } from '@angular/core';
import {NotifyService} from '../notify.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-notify-list',
  templateUrl: './notify-list.component.html',
  styleUrls: ['./notify-list.component.scss']
})
export class NotifyListComponent implements OnInit {

  notifyList$;
  constructor(private  notifyService: NotifyService) { }

  ngOnInit() {
    this.notifyList$ = this.notifyService.items.pipe( map (data => data.filter(item => item.isNew)));
    setInterval( () => {
       this.notifyService.removeExpired();
    }, 5000);
  }

  onClose(id: number) {
    this.notifyService.removeNotify(id);
  }
}
