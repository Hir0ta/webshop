import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
	selector: 'admin-request-password',
	templateUrl: './admin-request-password.component.html',
	styleUrls: ['./admin-request-password.component.scss']
})
export class AdminRequestPasswordComponent implements OnInit
{

	email;

	constructor(private router: Router, private http: HttpClient) { }

	ngOnInit(): void
	{
	}

	async send()
	{
		let result = await this.http.post('http://localhost:8080/adminPasswordReq',
			{
				email: this.email
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

		if(result)
		{
			alert('Kiküldtük a jelszókérő emailt');
			this.router.navigate(['/admin/login']);
		}
	}

}
