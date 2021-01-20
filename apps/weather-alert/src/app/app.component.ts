import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@credi-nord/api-interfaces';

@Component({
  selector: 'credi-nord-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}
