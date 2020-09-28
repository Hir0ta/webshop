import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import sha256 from 'crypto-js/sha256';

@Component({
	selector: 'admin-change-password',
	templateUrl: './admin-change-password.component.html',
	styleUrls: ['./admin-change-password.component.scss']
})
export class AdminChangePasswordComponent implements OnInit
{

	constructor(private route: ActivatedRoute, private http: HttpClient) { }
	jtoken;
	password1;
	password2;
	saveButton = true;
	passwordChangeResult;
	back2Main = false;

	ngOnInit(): void
	{
		this.jtoken = this.route.snapshot.queryParamMap.get('token');
	}

	async save()
	{
		if (this.password1 != this.password2) { alert('Jelszavak nem azonosak!'); return; };
		let result = await this.http.post('http://localhost:8080/adminNewPassword',
			{
				jtoken: this.jtoken,
				password: sha256(this.password1),
			},
			{
				headers: new HttpHeaders(
					{
						'Content-Type': 'application/json',
						'credentials': 'same-origin'
					}),
				withCredentials: true,
			}
		).toPromise();
		console.log(result);

		if(result)
		{
			this.saveButton = false;
			this.back2Main = true;
			this.passwordChangeResult = 'Sikeres jelszó változtatás';
			
		}
		else
		{
			this.passwordChangeResult = 'Valami hiba történt';
		}
	}



}
