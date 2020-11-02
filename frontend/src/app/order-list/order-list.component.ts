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
		let result = await this.httpService.callFunction('listOrders',{status: consts.orderStatus.ordered});
		this.orders = result.orders;
	}

	async showDetail(order_id)
	{
		let result = await this.httpService.callFunction('listOrders',{order_id: order_id});
		this.details = result.details;
		this.invoiceDatas = await this.httpService.callFunction('getInvoiceData', {user: this.details[0]['user']});
	}

	orders = [];
	details = [];
	invoiceDatas = [];
}
