import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/httpService.service';

@Component({
	selector: 'data-sheet',
	templateUrl: './data-sheet.component.html',
	styleUrls: ['./data-sheet.component.scss']
})
export class DataSheetComponent implements OnInit
{

	constructor(private httpService: HttpService) { }

	async ngOnInit()
	{
		await this.getUserData();
	}

	hasData = false;
	itsTheSame = false;
	user_id;
	users;
	invoiceData = 
	{
		name: '',
		inv_postcode: '',
		inv_city: '',
		inv_street: '',
		inv_house_num: '',
		ship_postcode: '',
		ship_city: '',
		ship_street: '',
		ship_house_num: ''
	}

	async getUserData()
	{
		let user = await this.httpService.callFunction('checkUser', {jtoken: localStorage.getItem('JToken')});
		this.user_id = user[0]['user_id'];  
		this.users = await this.httpService.callFunction('getUserData', {id: this.user_id});
		let data = await this.httpService.callFunction('getInvoiceData',{user: this.user_id});
		if(data.length > 0)
		{
			this.invoiceData = data[0];
			this.hasData = true;
		}
	}

	async save()
	{
		let result;
		if(!this.hasData)
		{
			result = await this.httpService.callFunction('addInvoiceData', 
			{
				user: this.users[0]['id'],
				invoices: this.invoiceData
			});
		}
		else 
		{
			result = await this.httpService.callFunction('modifyInvoiceData',
			{
				user: this.users[0]['id'],
				invoices: this.invoiceData
			})
		}

		if(result == true) alert('Sikeres mentés');
	}

	copy()
	{
		if(this.itsTheSame)
		{
			this.invoiceData.ship_postcode = this.invoiceData.inv_postcode,
			this.invoiceData.ship_city = this.invoiceData.inv_city,
			this.invoiceData.ship_street = this.invoiceData.inv_street,
			this.invoiceData.ship_house_num = this.invoiceData.inv_house_num
		}
		else
		{
			this.invoiceData.ship_postcode = '',
			this.invoiceData.ship_city = '',
			this.invoiceData.ship_street = '',
			this.invoiceData.ship_house_num = ''
		}
	}
}
