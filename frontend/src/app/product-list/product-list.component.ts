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
		this.loadlevelFilters();
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
	filters;
	values =
		{
			id: '',
			productName: '',
			price: ''
		};
	levelFilters =
		{
			top: 0,
			mid: 0,
			bottom: 0
		};

	toplevelFilters;
	midlevelFilters;
	bottomlevelFilters;

	showDeleted = false;
	orderBy = 'name';
	dir = false;
	direction = 'ASC';


	popup = false;

	test()
	{
		console.log(this.filters);
	}

	async refresh()
	{
		this.products = await this.httpService.callFunction('listProduct',
			{
				top: this.levelFilters.top,
				mid: this.levelFilters.mid,
				bottom: this.levelFilters.bottom,
				order: this.orderBy,
				dir: this.direction,
				showdeleted: this.showDeleted,
				jtoken: localStorage.getItem('adminJToken')
			});

			console.log(this.products);
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
					filters: this.filters
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
					filters: this.filters

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

		this.filters = {};

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

		this.filters = {};
	}

	async loadLevels()
	{
		this.topLevels = await this.httpService.callFunction('listLevel',
			{
				level: 'top_level',

			});

		this.midLevels = await this.httpService.callFunction('listLevel',
			{
				level: 'mid_level',
				parent: this.levels.top,

			});

		this.bottomLevels = await this.httpService.callFunction('listLevel',
			{
				level: 'bottom_level',
				parent: this.levels.mid,

			});

			if (this.levels.mid != 0) this.loadFilters();
	};

	async loadlevelFilters()
	{
		this.toplevelFilters = await this.httpService.callFunction('listLevel',
			{
				level: 'top_level',

			});

		this.midlevelFilters = await this.httpService.callFunction('listLevel',
			{
				level: 'mid_level',
				parent: this.levelFilters.top,

			});

		this.bottomlevelFilters = await this.httpService.callFunction('listLevel',
			{
				level: 'bottom_level',
				parent: this.levelFilters.mid,

			});
		//console.log(this.bottomlevelFilters);
	}

	async loadFilters()
	{
		this.filters = await this.httpService.callFunction('listFilters', { category: this.levels.mid });
	}

	async modify(product)
	{
		this.loadLevels();
		this.values.id = product.id
		this.values.productName = product.name;
		this.values.price = product.price;
		this.levels.top = product.top_id;
		this.levels.mid = product.mid_id
		this.levels.bottom = product.bottom_id;
		this.loadFilters();
		setTimeout(async () => {
			this.filters = await this.httpService.callFunction('loadFilters',{product: product.id});	
		}, 500);
		
		this.popup = true;
	}

	async delete(id)
	{
		await this.httpService.callFunction('deleteProduct', { id: id });
		this.refresh();
	}

	setOrder(orderBy)
	{
		this.dir = !this.dir;
		this.dir ? this.direction = 'ASC' : this.direction = 'DESC';
		this.orderBy = orderBy;
		this.refresh();
	}

}
