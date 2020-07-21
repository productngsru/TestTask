import {Injectable} from '@angular/core';
import {AppConstants} from '../AppConstants';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {publishReplay, refCount} from 'rxjs/operators';
import {NotifyService} from '../ui/notify.service';

// Структура итема списка
export interface TestListItem {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  selected?: boolean;
}

// Структура ответа от сервиса
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
  // Получает данные страницы от сервера
  private queryPage(pageIndex: number): Observable<TestListResponse> {
    const page = pageIndex.toString();
    return this.http.get <TestListResponse>(this.API_URL, {params: {page}});
  }
  // Получает данные и кэшурет
  getPage(pageIndex: number): Observable<TestListResponse> {
    if (!this._cache.has(pageIndex)) {
      const response = this.queryPage(pageIndex).pipe(publishReplay(1), refCount());
      this._cache.set(pageIndex, response);
    }
    return this._cache.get(pageIndex);
  }

  // Удаление
  deleteItem(id: number) {
    // Посылкаю запрос на удаление и очищаю кэш
    this.http.delete(this.API_URL + id.toString())
      .subscribe(() => this._cache.clear(),
        error => this.notifyService.showError(JSON.stringify(error, null, 4)));
  }

  updateItem(editRecord: TestListItem) {
    // Обновляю и очищаю кэш
    this.http.put(this.API_URL + editRecord.id.toString(), editRecord).subscribe(() => this._cache.clear(),
      error => this.notifyService.showError(JSON.stringify(error, null, 4))
    );
  }

  addItem(editRecord: TestListItem) {
    // Добавляю и очищаю кэш
    this.http.post(this.API_URL, editRecord).subscribe(() => this._cache.clear(),
      error => this.notifyService.showError(JSON.stringify(error, null, 4))
    );
  }
}
