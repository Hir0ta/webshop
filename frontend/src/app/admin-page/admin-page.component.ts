import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import sha256 from 'crypto-js/sha256';

@Component({
	selector: 'admin-page',
	templateUrl: './admin-page.component.html',
	styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit
{
	initialized
	constructor(private http: HttpClient, private router: Router) { }

	ngOnInit()
	{
		let jtoken = localStorage.getItem('adminJToken');
		if(jtoken) this.initialized = true;
	}


}
