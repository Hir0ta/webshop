import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/httpService.service';

@Component({
	selector: 'product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit
{

	constructor(private route: ActivatedRoute, private httpService: HttpService) { }

	ngOnInit()
	{
		this.route.queryParams.subscribe(async params => 
		{
			this.products = await this.httpService.callFunction('listFilteredProducts',
			{ 
				id: params.id, 
				mid: params.category 
			});
			this.filters = await this.httpService.callFunction('loadFilters',{product: params.id})
		});

	}

	products;
	filters
	qty = 1;

	async addToCart()
	{
		
		let user = await this.httpService.callFunction('checkUser', {jtoken: localStorage.getItem('JToken')});
		let user_id = user[0]['user_id'];  
		let result = await this.httpService.callFunction('addToCart', 
		{
			user: user_id,
			product: this.products[0]['product_id'],
			qty: this.qty
		});

		console.log(result);
		if(result == true) alert('Sikeresen a kosárhoz adva');
	}

}
