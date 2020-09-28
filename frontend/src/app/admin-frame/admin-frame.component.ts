import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
	selector: 'admin-frame',
	templateUrl: './admin-frame.component.html',
	styleUrls: ['./admin-frame.component.scss']
})
export class AdminFrameComponent implements OnInit
{

	initialized = false;
	jtoken;
	logedIn = false;
	constructor(private router: Router, private http: HttpClient) { }

	async ngOnInit()
	{

		let logedIn = await this.http.post('http://localhost:8080/checkAdmin',
		{
			jtoken: localStorage.getItem("adminJToken")
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

		if(logedIn)
		{
			this.logedIn = true;
			this.router.navigate(['/admin/admin-page'])
		}
		else
		{
			this.logedIn = false;
			this.router.navigate(['/admin/login']);
		}
	}

}
