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
	deleted = 0;

	saveLevel()
	{
		if(!this.modifyPopup)
		{
			this.httpService.callFunction('addLevel',
			{
				jtoken: localStorage.getItem('adminJToken'),
				level: this.items.level,
				name: this.items.name,
				parent: this.items.parent
			})
		}
		else
		{
			console.log(this.items);
			this.httpService.callFunction('modifyLevel',
			{
				jtoken: localStorage.getItem('adminJToken'),
				id: this.items.id,
				level: this.items.level,
				name: this.items.name,
				parent: this.items.parent
			})
		}

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


	modifyLevel(level,items)
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

	async modify()
	{
		this.httpService.callFunction('modifyLevel',
		{
			jtoken: localStorage.getItem('adminJToken'),
			level: this.items.level,
			id: this.items.id,
			name: this.items.name
		});

		this.popup = false;
		this.modifyPopup = false;
		this.items = '';

		this.refresh();
	}

	async deleteLevel(level, items)
	{
		alert('Biztos benne?');
		this.httpService.callFunction('deleteLevel',
		{
			jtoken: localStorage.getItem('adminJToken'),
			level: level,
			id: items.id,
			name: items.name
		});

		this.refresh();
	}

	async refresh()
	{
		this.topLevels = await this.httpService.callFunction('listLevel',
		{
			level: 'top_level',
			jtoken: localStorage.getItem('adminJToken'),
		});


		this.midLevels = await this.httpService.callFunction('listLevel',
		{
			level: 'mid_level',
			jtoken: localStorage.getItem('adminJToken'),
		});

		this.bottomLevels = await this.httpService.callFunction('listLevel',
		{
			level: 'bottom_level',
			jtoken: localStorage.getItem('adminJToken'),
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

}
