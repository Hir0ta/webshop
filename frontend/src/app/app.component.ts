import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/httpService.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
	title = 'Webshop';
	initialized;

	constructor(private services: HttpService)
	{

	}

	async ngOnInit()
	{
		await this.services.getConfig();
		this.initialized = true;
	}
}
