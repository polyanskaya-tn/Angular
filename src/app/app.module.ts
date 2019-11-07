import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import { EventsComponent } from './events/events.component';
import { EventService } from './event.service';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
