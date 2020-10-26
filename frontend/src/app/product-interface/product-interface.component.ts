import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/httpService.service';

@Component({
	selector: 'product-interface',
	templateUrl: './product-interface.component.html',
	styleUrls: ['./product-interface.component.scss']
})
export class ProductInterfaceComponent implements OnInit
{

	constructor(private route: ActivatedRoute, private httpService: HttpService)
	{

	}

	async ngOnInit()
	{

		this.route.queryParams.subscribe(async params => 
		{
			this.parent = params.category;
			await this.loadFilter();
			await this.refresh();
			this.categories = await this.httpService.callFunction('listLevel', { level: 'bottom_level', parent: this.parent });
		});


	}

	categories;
	products;
	parent;
	filterDatas;
	filterSelects = [];
	selectedCategory = 0;

	async refresh()
	{
		this.products = await this.httpService.callFunction('listFilteredProducts',
			{
				mid: this.parent,
				category: this.selectedCategory,
				filterDatas: this.filterDatas,
				order: 'name',
				dir: 'desc'
			});
	}

	async loadFilter()
	{
		this.filterDatas = await this.httpService.callFunction('listFilters', { category: this.parent });

		for (let filterData of this.filterDatas)
		{
			filterData.data = 0;

			let filterSelects = await this.httpService.callFunction('filterSelects', { filter_name: filterData.name })
			for (let filterSelect of filterSelects)
			{
				this.filterSelects.push(filterSelect)
			}
		}
	}

	filterCategory(category)
	{
		this.selectedCategory = category;
		this.refresh();
	}

}
