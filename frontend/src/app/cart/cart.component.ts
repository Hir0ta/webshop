import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/httpService.service'

@Component({
	selector: 'cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit
{

	constructor(private httpService: HttpService) { }

	async ngOnInit()
	{
		await this.refresh();
	}

	async refresh()
	{
		let user = await this.httpService.callFunction('checkUser', {jtoken: localStorage.getItem('JToken')});
		this.user_id = user[0]['user_id'];  
		this.orders = await this.httpService.callFunction('listCart',{user: this.user_id, status: 1});
	}

	async order()
	{

		let result = await this.httpService.callFunction('order',
		{
			user: this.user_id,
			orders: this.orders
		})

		if(result == true) alert('Sikeres rendelés');
	}

	async showOrders()
	{
		let result = await this.httpService.callFunction('listOrders',{user_id: this.user_id});
		this.ordered = result.orders;
	}

	async showOrderDetails(order_id)
	{
		let result = await this.httpService.callFunction('listOrders',{order_id: order_id});
		this.details = result.details;
	}

	orders = [];
	ordered = [];
	details = [];
	user_id;
	status = 
	[
		'Törölve',
		'Kosárban',
		'Megrendelve',
		'Kiszállítva',
		'Teljesítve'
	]
}
