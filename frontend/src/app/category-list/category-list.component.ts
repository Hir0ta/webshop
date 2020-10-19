import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/httpService.service';

@Component({
	selector: 'category-list',
	templateUrl: './category-list.component.html',
	styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit
{

	constructor(private httpService: HttpService) { }

	ngOnInit()
	{
		this.refresh();
	}

	popup = false;
	topLevel = false;
	midLevel = false;
	bottomLevel = false;
	modifyPopup = false;

	items;
	topLevels;
	midLevels;
	bottomLevels;
	filters = [];
	deleted = 0;

	saveLevel()
	{
		let params;

		if (!this.modifyPopup)
		{
			params =
			{
				level: this.items.level,
				name: this.items.name,
				parent: this.items.parent
			}
			this.httpService.callFunction('addLevel', params);
		}
		else 
		{
			params =
			{
				id: this.items.id,
				level: this.items.level,
				name: this.items.name,
				parent: this.items.parent
			}
			this.httpService.callFunction('modifyLevel', params);
		};

		

		this.popup = false;
		this.topLevel = false;
		this.midLevel = false;
		this.bottomLevel = false;
		this.modifyPopup = false;
		this.items = {};
		this.refresh();
	}

	newTopLevel()
	{
		this.popup = true;
		this.topLevel = true;
		this.items =
		{
			level: 'top_level',
			name: ''
		}
	}

	newMidLevel(parent)
	{
		this.popup = true;
		this.midLevel = true;
		this.items =
		{
			name: '',
			level: 'mid_level',
			parent: parent
		}
	}

	newBottomLevel(parent)
	{
		this.popup = true;
		this.bottomLevel = true;
		this.items =
		{
			name: '',
			level: 'bottom_level',
			parent: parent
		}
	}


	modifyLevel(level, items)
	{
		this.popup = true;
		this.modifyPopup = true;
		this.items =
		{
			level: level,
			id: items.id,
			name: items.name
		}

	}

	async deleteLevel(level, items)
	{
		let confirmed = confirm('Biztos benne?');
		if (confirmed)
		{
			this.httpService.callFunction('deleteLevel',
				{

					level: level,
					id: items.id,
					name: items.name
				});

			this.refresh();
		}
		else
		{
			return
		}

	}

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

		this.bottomLevels = await this.httpService.callFunction('listLevel',
			{
				level: 'bottom_level',

			});
	}

	cancel()
	{
		this.popup = false;
		this.topLevel = false;
		this.midLevel = false;
		this.bottomLevel = false;
		this.modifyPopup = false;
		this.items = {};
	}

	trackByFn(index: any, item: any)
	{
		return index;
	}

}
