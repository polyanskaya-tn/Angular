import { Component, OnInit } from '@angular/core';

import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public articles;

  constructor(private _eventService: EventService) { 

    _eventService.updateEvents$.subscribe(
      flag => {
        this.getEvents();
      });
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this._eventService.getEvents().subscribe(
      articles => {
        this.articles = articles;
    });
  }

  getAuthorStr(article) {
    var authors = article.authors.map( 
      (item) => {return item.name+' '+item.surname;}
    );
    return authors.join(', ');
  }

  getDate(mongoDate) {
    var d = new Date(mongoDate);
    var day = d.getDate();
    var month = d.getMonth()+1;
    var sday = day < 10 ? '0'+day : day;
    var smonth = month < 10 ? '0' + month : month;
    
    return sday+'.'+
    smonth+'.'+
    d.getFullYear()+' '+
    d.getHours()+':'+
    d.getMinutes();
  }

}
