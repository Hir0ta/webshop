import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import sha256 from 'crypto-js/sha256';
import { uuid } from 'uuidv4';

@Component({
	selector: 'app-admin-login',
	templateUrl: './admin-login.component.html',
	styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit
{
	user_name;
	password;
	loginFailed;
	jtoken;

	constructor(private http: HttpClient, private router: Router) { }

	ngOnInit()
	{

	}

	async login()
	{
		let result = await this.http.post('http://localhost:8080/loginAdmin',
			{
				user_name: this.user_name,
				password: sha256(this.password),
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

		if (result != false)
		{
			localStorage.setItem('adminJToken', result[0].jtoken );

			this.router.navigate(['/admin/admin-page']);
		}
		else
		{
			localStorage.setItem('adminJToken', '');
			this.loginFailed = 'Hibás email vagy jelszó'
		}

	}

	lostPassword()
	{
		this.router.navigate(['/admin/password-request']);
	}
}
