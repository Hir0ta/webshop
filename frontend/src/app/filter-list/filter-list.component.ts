import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/httpService.service';

@Component({
	selector: 'filter-list',
	templateUrl: './filter-list.component.html',
	styleUrls: ['./filter-list.component.scss']
})
export class FilterListComponent implements OnInit
{

	constructor(private httpService: HttpService) { }

	ngOnInit()
	{
		this.refresh();
	}

	topLevels;
	midLevels;
	popup = false;
	modify = false;
	category;
	filters = [];

	async refresh()
	{
		this.topLevels = await this.httpService.callFunction('listLevel',
			{
				level: 'top_level',
			});

		this.midLevels = await this.httpService.callFunction('listLevel',
			{
				level: 'mid_level',
			});
	}

	async editFilter(category)
	{
		this.popup = true;
		this.category = category;

		let filters = await this.httpService.callFunction('listFilters', { category: category });
		console.log(filters);

		if (filters)
		{
			this.modify = true;
			let i = 0;
			for (let filter of filters)
			{
				this.filters[i] = filter;
				++i;
			}
		}
		else
		{
			this.addFilter();
		}
	}

	addFilter()
	{
		this.filters.push(
			{
				id: '',
				category: this.category,
				name: '',
				unit: ''
			}
		);
	}

	trackByFn(index: any, item: any)
	{
		return index;
	}

	async save()
	{
		let result;

		if (!this.modify)
		{
			result = await this.httpService.callFunction('createFilter', { filters: this.filters });
		}
		else 
		{
			result = await this.httpService.callFunction('modifyFilter', { filters: this.filters });
		}

		if (result)
		{
			this.filters = [];
			this.popup = false;
			this.modify = false;
		}
	}

	cancel()
	{
		this.filters = [];
		this.popup = false;
	}

}
