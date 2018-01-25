import { Component,OnInit } from '@angular/core';

@Component({
	selector: 'login-app',
	templateUrl: 'login.component.html',
	styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    appName = 'Setting up Angular 2 Webpack 2 Application';

    constructor() { }

    ngOnInit() { }
  }
