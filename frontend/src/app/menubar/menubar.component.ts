import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/httpService.service';
import { menuAnimations } from '../../animations/menuAnimations';

@Component({
	selector: 'menubar',
	templateUrl: './menubar.component.html',
	styleUrls: ['./menubar.component.scss'],
	animations: menuAnimations
})
export class MenubarComponent implements OnInit
{

	constructor(private httpService: HttpService) { }

	ngOnInit(): void
	{
		this.refresh();
	}

	topLevels;
	midLevels;
	bottomLevels;
	orderBy = 'name';
	dir: 'desc';

	async refresh()
	{
		this.topLevels = await this.httpService.callFunction('listLevel', { level: 'top_level' });
		for(let topLevel of this.topLevels)
		{
			topLevel.open = false;
		}
		
		this.midLevels = await this.httpService.callFunction('listLevel', { level: 'mid_level' });
	}

}
