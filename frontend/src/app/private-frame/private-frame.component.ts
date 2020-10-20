import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/httpService.service';
import { Router } from '@angular/router';

@Component({
	selector: 'private-frame',
	templateUrl: './private-frame.component.html',
	styleUrls: ['./private-frame.component.scss']
})
export class PrivateFrameComponent implements OnInit
{

	constructor(private httpService: HttpService, private router: Router) { }

	async ngOnInit()
	{
		let result = await this.httpService.callFunction('checkUser',
		{
			jtoken: localStorage.getItem('JToken')
		});


		if(result == false)  this.router.navigate(['/public']);
	}

}
