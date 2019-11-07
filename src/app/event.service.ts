import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private filters = {
    category: '',
    author: '',
    offset: 0,
    limit: 20
  }

  // Observable string sources
  private updateSource = new Subject<boolean>();

  // Observable string streams
  updateEvents$ = this.updateSource.asObservable();

  // Service message commands
  updateEvents(isUpdate: boolean) {
    this.updateSource.next(isUpdate);
  }

  constructor(private _http: HttpClient) { }

  public getEvents() {
    var sparams = '?offset='+this.filters.offset+
      '&limit='+this.filters.limit;
    if (this.filters.category)
      sparams += '&category='+this.filters.category;
    if (this.filters.author)
      sparams += '&author='+this.filters.author;

    return this._http.get('http://localhost:3000/api/event'+sparams);
  }

  public getCategories() {
    return this._http.get('http://localhost:3000/api/category');  
  }

  public getAuthors() {
    return this._http.get('http://localhost:3000/api/author');  
  }

  public changeCategory(id) {
    this.filters.category = id;
    this.updateEvents(true);
  }

  public changeAuthor(id) {
    this.filters.author = id;
    this.updateEvents(true);
  }

  public resetFilters() {
    this.filters = {
      category: '',
      author: '',
      offset: 0,
      limit: 20
    };
    this.updateEvents(true);
  }
}
