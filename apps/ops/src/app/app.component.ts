import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Message } from '@rovacc/core-interfaces'

@Component({
  selector: 'rovacc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/core/hello')
  constructor(private http: HttpClient) {}
}
