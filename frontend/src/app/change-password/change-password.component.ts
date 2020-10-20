import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/httpService.service';
import sha256 from 'crypto-js/sha256';

@Component({
	selector: 'change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit
{

	success = '';
	jtoken;
	password1;
	password2;
	constructor(private httpService: HttpService, private route: ActivatedRoute) { }

	ngOnInit()
	{
		this.jtoken = this.route.snapshot.queryParamMap.get('token');
	}

	async send() 
	{
		if (this.password1 != this.password2) { alert('A jelszavak nem egyeznek!'); return };

		let result = await this.httpService.callFunction('userNewPassword',{jtoken: this.jtoken, password: sha256(this.password1)});
		console.log(result);
		if(result == true) this.success = 'Sikeres jelszóváltoztatás'
	};

}
