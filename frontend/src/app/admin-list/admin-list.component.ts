import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../services/httpService.service';
import { Router } from '@angular/router';
import sha256 from 'crypto-js/sha256';

@Component({
	selector: 'admin-list',
	templateUrl: './admin-list.component.html',
	styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit
{

	items = {
		adminID: undefined,
		user_name: '',
		email: '',
	}
	popup = false;
	showDeleted = false;
	failMessage = undefined;

	admins: any;
	result: any;

	constructor(private httpService: HttpService, private http: HttpClient, private router: Router) { }

	ngOnInit()
	{
		this.refresh();
	}

	async refresh()
	{

		this.admins = await 
		
		this.httpService.callFunction('listAdmins',
		{
			jtoken: localStorage.getItem('adminJToken'),
			deleted: this.showDeleted,
			order: 'email',
			dir: 'desc'
		})
	}

	async logOut()
	{
		this.httpService.callFunction('destroyJToken',
		{
			jtoken: localStorage.getItem('adminJToken'),
		})

		localStorage.setItem('adminLogedIn', 'false');
		this.router.navigate(['/admin/login']);
	}

	newAdminAdd()
	{
		this.popup = true;
		console.log(this.items);
	}

	modifyAdmin(item)
	{
		this.popup = true;
		this.items = JSON.parse(JSON.stringify(item));
		console.log(this.items);
	}

	deleteAdmin(item)
	{
		this.httpService.callFunction('deleteAdmin',
		{
			jtoken: localStorage.getItem('adminJToken'),
			id: item.adminID,
		})
	
		this.refresh();
	}

	async saveAdmin()
	{
		console.log(this.items);

		let result: any;

		if (this.items.adminID === undefined)
		{
			result = this.http.post('http://localhost:8080/addAdmin',
				{
					jtoken: localStorage.getItem('adminJToken'),
					user_name: this.items.user_name,
					email: this.items.email,
				},
				{
					headers: new HttpHeaders(
						{
							'Content-Type': 'application/json',
							'credentials': 'same-origin'
						}),
					withCredentials: true,
				}

			).toPromise().then( result => { 
				console.log(result);

				if(!result) 
				{
					this.failMessage = 'Felhasználónév vagy e-mail cím foglalt'; 
					return;
				}

				if(this.failMessage != undefined) return;	

				this.items.user_name = '';
				this.items.email = '';
				this.popup = false;
				this.refresh();
			});
		}
		else 
		{

			result = this.http.post('http://localhost:8080/modifyAdmin',
				{
					jtoken: localStorage.getItem('adminJToken'),
					id: this.items.adminID,
					user_name: this.items.user_name,
					email: this.items.email,
				},
				{
					headers: new HttpHeaders(
						{
							'Content-Type': 'application/json',
							'credentials': 'same-origin'
						}),
					withCredentials: true,
				}

			).toPromise().then( result => { 

				if(!result) 
				{
					this.failMessage = 'Felhasználónév vagy e-mail cím foglalt'; 
					return;
				}
				
				if(this.failMessage != undefined) return;	
					
				this.items.user_name = '';
				this.items.email = '';
				this.popup = false;
				this.refresh();
			});
		}



	}

	cancel()
	{
		this.failMessage = '';
		this.items.user_name = '';
		this.items.email = '';
		this.popup = false;
	}

}
