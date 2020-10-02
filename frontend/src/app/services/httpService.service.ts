import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class HttpService
{

	config;

	constructor(private http: HttpClient) 
	{


	}

	async getConfig()
	{
		this.http.get('assets/config.json', { responseType: 'text' }).subscribe(
			data => { this.config = JSON.parse(data) }
		)
	}

	async callFunction(functionName: string, args?: Object)
	{

		let result: any;
		try
		{
			result = await this.http.post(this.config.server.url + '/' + functionName, args,
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
		catch (e)
		{
			console.log(e)
		}
		//console.log(result);
		return result;
	}
}
