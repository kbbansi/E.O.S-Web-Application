import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adinkrah';
  firstName: any;

  constructor() {
    this.firstName = sessionStorage.getItem('firstName');
    console.log(this.firstName)
  }
}
