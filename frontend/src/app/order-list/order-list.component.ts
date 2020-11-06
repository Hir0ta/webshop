import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/httpService.service';
import * as consts from '../../../../common/consts/consts';

@Component({
	selector: 'order-list',
	templateUrl: './order-list.component.html',
	styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit
{

	constructor(private httpService: HttpService) { }

	async ngOnInit()
	{
		await this.refresh()
	}

	async refresh()
	{
		let result = await this.httpService.callFunction('listOrders',{status: this.status});
		this.orders = result.orders;
	}

	async showDetail(order_id)
	{
		let result = await this.httpService.callFunction('listOrders',{order_id: order_id});
		this.details = result.details;
		this.invoiceDatas = await this.httpService.callFunction('getInvoiceData', {user: this.details[0]['user']});
	}

	async sended(order_id) {
		let confirmed = confirm('Biztos benne?');

		if(confirmed)
		{
			this.httpService.callFunction('changeStatus',
			{
				order_id: order_id, 
				oldStatus: consts.orderStatus.ordered,
				newStatus: consts.orderStatus.shipped
			})
		}

		this.refresh()
	};

	async finished(order_id)
	{
		let confirmed = confirm('Biztos benne?');

		if(confirmed)
		{
			this.httpService.callFunction('changeStatus',
			{
				order_id: order_id, 
				oldStatus: consts.orderStatus.shipped,
				newStatus: consts.orderStatus.finished
			})
		}

		this.refresh()
	}

	orders = [];
	details = [];
	invoiceDatas = [];
	status = 2
}
