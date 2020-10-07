import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/httpService.service';

@Component({
	selector: 'product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit
{

	constructor(private httpService: HttpService) { }

	async ngOnInit()
	{
		this.loadFilters();
		this.refresh();
	}

	products;

	levels =
		{
			top: 0,
			mid: 0,
			bottom: 0
		};
	topLevels;
	midLevels;
	bottomLevels;
	values =
		{
			id: '',
			productName: '',
			price: ''
		};
	filters =
		{
			top: 0,
			mid: 0,
			bottom: 0
		};

	topFilters;
	midFilters;
	bottomFilters;

	showDeleted = false;
	orderBy = 'name';
	dir = false;
	direction = 'ASC';


	popup = false;

	async refresh()
	{
		this.products = await this.httpService.callFunction('listProduct',
			{
				top: this.filters.top,
				mid: this.filters.mid,
				bottom: this.filters.bottom,
				order: this.orderBy,
				dir: this.direction,
				showdeleted: this.showDeleted,
				jtoken: localStorage.getItem('adminJToken')
			});
	};

	newProduct()
	{
		this.popup = true;
		this.loadLevels();
	}

	async save()
	{
		let result;
		if (this.values.id == '')
		{
			result = await this.httpService.callFunction('addProduct',
				{
					name: this.values.productName,
					price: this.values.price,
					category: this.levels.bottom,
					jtoken: localStorage.getItem('adminJToken'),
				});
		}
		else
		{
			result = await this.httpService.callFunction('modifyProduct',
				{
					id: this.values.id,
					name: this.values.productName,
					price: this.values.price,
					category: this.levels.bottom,
					jtoken: localStorage.getItem('adminJToken'),
				});
		}


		if (result === true)
		{
			this.popup = false;
			this.levels =
			{
				top: 0,
				mid: 0,
				bottom: 0
			};
		}

		this.values =
		{
			id: '',
			productName: '',
			price: ''
		}

		this.refresh();
	}

	cancel()
	{
		this.popup = false;
		this.levels =
		{
			top: 0,
			mid: 0,
			bottom: 0
		};

		this.values =
		{
			id: '',
			productName: '',
			price: ''
		}
	}

	async loadLevels()
	{
		this.topLevels = await this.httpService.callFunction('listLevel',
			{
				level: 'top_level',
				jtoken: localStorage.getItem('adminJToken'),
			});

		this.midLevels = await this.httpService.callFunction('listLevel',
			{
				level: 'mid_level',
				parent: this.levels.top,
				jtoken: localStorage.getItem('adminJToken'),
			});

		this.bottomLevels = await this.httpService.callFunction('listLevel',
			{
				level: 'bottom_level',
				parent: this.levels.mid,
				jtoken: localStorage.getItem('adminJToken'),
			});
	};

	async loadFilters()
	{
		this.topFilters = await this.httpService.callFunction('listLevel',
			{
				level: 'top_level',
				jtoken: localStorage.getItem('adminJToken'),
			});

		console.log(this.topFilters);
		this.midFilters = await this.httpService.callFunction('listLevel',
			{
				level: 'mid_level',
				parent: this.filters.top,
				jtoken: localStorage.getItem('adminJToken'),
			});
		console.log(this.midFilters);

		this.bottomFilters = await this.httpService.callFunction('listLevel',
			{
				level: 'bottom_level',
				parent: this.filters.mid,
				jtoken: localStorage.getItem('adminJToken'),
			});
		console.log(this.bottomFilters);
	}

	async modify(product)
	{
		this.values.id = product.id
		this.values.productName = product.name;
		this.values.price = product.price;
		this.loadLevels();
		let levels = await this.httpService.callFunction('listLevels',
			{
				bottom: product.categoryid
			});
		this.levels.top = levels.top;
		this.levels.mid = levels.mid
		this.levels.bottom = levels.bottom;

		this.popup = true;
	}

	async delete(id)
	{
		await this.httpService.callFunction('deleteProduct', { id: id });
	}

	setOrder(orderBy)
	{
		this.dir = !this.dir;
		this.dir ? this.direction = 'ASC' : this.direction = 'DESC';
		this.orderBy = orderBy;
		this.refresh();
	}

}
