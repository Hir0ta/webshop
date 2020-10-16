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
		id: undefined,
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
					
					deleted: this.showDeleted,
					order: 'email',
					dir: 'desc'
				})
	}

	async logOut()
	{
		this.httpService.callFunction('destroyJToken',
			{
				
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
		//console.log(this.items);
	}

	async deleteAdmin(item)
	{
		let result = await this.httpService.callFunction('deleteAdmin',
			{
				
				id: item.id,
			});

		//console.log(result);

		if (this.result === false) 
		{
			alert('Ez a felhasználó nem törölhető!');
			return;
		};

		this.refresh();
	}

	async saveAdmin()
	{
		let result: any;

		if (this.items.id === undefined)
		{
			result = await this.httpService.callFunction('addAdmin',
				{
					
					user_name: this.items.user_name,
					email: this.items.email,
				});

			if (!result) 
			{
				this.failMessage = 'Felhasználónév vagy e-mail cím foglalt';
				return;
			}

			if (this.failMessage != undefined) return;

			this.items.user_name = '';
			this.items.email = '';
			this.popup = false;
			this.refresh();
		}
		else 
		{
			result = await this.httpService.callFunction('modifyAdmin',
				{
					
					id: this.items.id,
					user_name: this.items.user_name,
					email: this.items.email,
				});

			if (!result) 
			{
				this.failMessage = 'Felhasználónév vagy e-mail cím foglalt';
				return;
			}

			if (this.failMessage != undefined) return;

			this.items.user_name = '';
			this.items.email = '';
			this.popup = false;
			this.refresh();
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
