import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/httpService.service';

@Component({
	selector: 'activation',
	templateUrl: './activation.component.html',
	styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit
{

	constructor(private httpService: HttpService, private route: ActivatedRoute) { }

	async ngOnInit()
	{
		this.jtoken = this.route.snapshot.queryParamMap.get('token');
		this.user_id = this.route.snapshot.queryParamMap.get('user');
		
		this.httpService.callFunction('activate',
		{
			jtoken: this.jtoken,
			id: this.user_id
		})
	}

	jtoken;
	user_id;

}
