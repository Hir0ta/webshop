import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
	selector: 'category-list',
	templateUrl: './category-list.component.html',
	styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit
{

	constructor(private http: HttpClient) { }

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

	newTopLevel()
	{
		this.popup = true;
		this.topLevel = true;
		this.items =
		{
			name: ''
		}
	}

	async saveTopLevel()
	{
		this.http.post('http://localhost:8080/addTopLevel',
			{
				jtoken: localStorage.getItem('adminJToken'),
				name: this.items.name,
			},
			{
				headers: new HttpHeaders(
					{
						'Content-Type': 'application/json',
						'credentials': 'same-origin'
					}),
				withCredentials: true,
			}

		).toPromise();
		this.popup = false;
		this.topLevel = false;
		this.items = {};
		this.refresh();
	}

	newMidLevel(parent)
	{
		this.popup = true;
		this.midLevel = true;
		this.items =
		{
			name: '',
			parent: parent
		}
	}

	saveMidLevel()
	{
		this.http.post('http://localhost:8080/addMidLevel',
			{
				jtoken: localStorage.getItem('adminJToken'),
				name: this.items.name,
				parent: this.items.parent
			},
			{
				headers: new HttpHeaders(
					{
						'Content-Type': 'application/json',
						'credentials': 'same-origin'
					}),
				withCredentials: true,
			}

		).toPromise();
		this.popup = false;
		this.midLevel = false;
		this.items = {};
		this.refresh();
	}

	newBottomLevel(parent)
	{
		this.popup = true;
		this.bottomLevel = true;
		this.items =
		{
			name: '',
			parent: parent
		}
	}

	saveBottomLevel()
	{
		this.http.post('http://localhost:8080/addBottomLevel',
			{
				jtoken: localStorage.getItem('adminJToken'),
				name: this.items.name,
				parent: this.items.parent
			},
			{
				headers: new HttpHeaders(
					{
						'Content-Type': 'application/json',
						'credentials': 'same-origin'
					}),
				withCredentials: true,
			}

		).toPromise();
		this.popup = false;
		this.midLevel = false;
		this.items = {};
		this.refresh();
	}

	modifyLevel(level,items)
	{
		this.popup = true;
		this.modifyPopup = true;
		this.items =
		{
			level: level,
			id: items.ID,
			name: items.name
		}

	}

	async modify()
	{
		console.log(this.items);
		await this.http.post('http://localhost:8080/modifyLevel',
		{
			jtoken: localStorage.getItem('adminJToken'),
			level: this.items.level,
			id: this.items.id,
			name: this.items.name
		},
		{
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'credentials': 'same-origin'
				}),
			withCredentials: true,
		}).toPromise();

		this.popup = false;
		this.modifyPopup = false;
		this.items = '';

		this.refresh();
	}

	async deleteLevel(level, items)
	{
		alert('Biztos benne?');
		await this.http.post('http://localhost:8080/deleteLevel',
		{
			jtoken: localStorage.getItem('adminJToken'),
			level: level,
			id: items.ID,
			name: items.name
		},
		{
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'credentials': 'same-origin'
				}),
			withCredentials: true,
		}).toPromise();

		this.refresh();
	}

	async refresh()
	{
		this.topLevels = await this.http.post('http://localhost:8080/listLevel',
			{
				level: 'top_level',
				jtoken: localStorage.getItem('adminJToken'),
			},
			{
				headers: new HttpHeaders(
					{
						'Content-Type': 'application/json',
						'credentials': 'same-origin'
					}),
				withCredentials: true,
			}

		).toPromise();

		this.midLevels = await this.http.post('http://localhost:8080/listLevel',
			{
				level: 'mid_level',
				jtoken: localStorage.getItem('adminJToken'),
			},
			{
				headers: new HttpHeaders(
					{
						'Content-Type': 'application/json',
						'credentials': 'same-origin'
					}),
				withCredentials: true,
			}

		).toPromise();

		this.bottomLevels = await this.http.post('http://localhost:8080/listLevel',
			{
				level: 'bottom_level',
				jtoken: localStorage.getItem('adminJToken'),
			},
			{
				headers: new HttpHeaders(
					{
						'Content-Type': 'application/json',
						'credentials': 'same-origin'
					}),
				withCredentials: true,
			}

		).toPromise();

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
