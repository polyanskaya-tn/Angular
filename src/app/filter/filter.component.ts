import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

	public categories;
	public authors;
	public selCategory;
  public selAuthor;

  constructor(private _eventService: EventService) { }

  ngOnInit() {
  	this._eventService.getCategories().subscribe(
  		items => {
  			this.categories = items;
  		});
    this._eventService.getAuthors().subscribe(
      (items:any[]) => {
        var opts=items.map( 
            (item) => {
              var obj = {
                label: item.name + ' ' + item.surname,
                value: item._id
              };
              return obj;
            });
        this.authors = opts;
        this.selAuthor = opts[0].value;
      });
  }

  changeCategory(event, id) {
  	event.preventDefault();
  	this.selCategory = id;
    this._eventService.changeCategory(id);
  }

  changeAuthor(selection) {
    this._eventService.changeAuthor(selection);
  }

  handleReset() {
  	this._eventService.resetFilters();
    this.selCategory = '';
  }
}
