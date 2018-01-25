import { AppConfig } from './app.config';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* App Root */
import { AppComponent } from './app.component';
// import { LoginComponent } from ''
/* Feature Modules */
import { CoreModule } from './core/core.module';

/* Routing Module */
import { AppRoutingModule,ROUTING_COMPONENT } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
// import { MaterialModule } from '@angular/material';
import 'hammerjs';
@NgModule({
	imports: [
		BrowserModule,
		/* Core Module */
		CoreModule.forRoot({ userName: 'Nguyen Tran' }),
		AppRoutingModule,
		MatButtonModule,
		MatCheckboxModule
	],
	exports: [MatButtonModule, MatCheckboxModule],
	declarations: [AppComponent].concat(ROUTING_COMPONENT),
	providers: [{ provide: AppConfig, useValue: process.env.APP_CONFIG }, { provide: APP_BASE_HREF, useValue: '/' }],
	bootstrap: [AppComponent]
})
export class AppModule { }
