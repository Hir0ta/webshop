import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/httpService.service';

@Component({
	selector: 'reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit
{

	constructor(private httpService: HttpService) { }

	ngOnInit(): void
	{
	}

	email;
	reqSuccess

	async send()
	{
		let result = await this.httpService.callFunction('passwordReq',{email: this.email});
		console.log(result);
		if(result == true) this.reqSuccess = 'Kiküldtük a jelszókérő emailt';
	}

}
