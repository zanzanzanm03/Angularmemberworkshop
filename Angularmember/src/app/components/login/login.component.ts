import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  Url = AppURL;
}
