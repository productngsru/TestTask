import {Injectable} from '@angular/core';
import {AppConstants} from '../AppConstants';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {publishReplay, refCount} from 'rxjs/operators';
import {NotifyService} from '../ui/notify.service';

export interface TestListItem {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  selected?: boolean;
}

export interface TestListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: TestListItem[];
}

@Injectable({
  providedIn: 'root'
})

export class TestListService {
  private readonly API_URL = AppConstants.baseApiURL + 'users/';
  // tslint:disable-next-line:variable-name
  private _cache = new Map<number, Observable<TestListResponse>>();

  constructor(private http: HttpClient,
              private notifyService: NotifyService) {
  }

  private queryPage(pageIndex: number): Observable<TestListResponse> {
    const page = pageIndex.toString();
    return this.http.get <TestListResponse>(this.API_URL, {params: {page}});
  }

  getPage(pageIndex: number): Observable<TestListResponse> {
    if (!this._cache.has(pageIndex)) {
      const response = this.queryPage(pageIndex).pipe(publishReplay(1), refCount());
      this._cache.set(pageIndex, response);
    }
    return this._cache.get(pageIndex);
  }

  deleteItem(id: number) {
    this.http.delete(this.API_URL + id.toString())
      .subscribe(() => this._cache.clear(),
        error => this.notifyService.showError(JSON.stringify(error, null, 4)));
  }

  updateItem(editRecord: TestListItem) {
    this.http.put(this.API_URL + editRecord.id.toString(), editRecord).subscribe(() => this._cache.clear(),
      error => this.notifyService.showError(JSON.stringify(error, null, 4))
    );
  }

  addItem(editRecord: TestListItem) {
    this.http.post(this.API_URL, editRecord).subscribe(() => this._cache.clear(),
      error => this.notifyService.showError(JSON.stringify(error, null, 4))
    );
  }
}
