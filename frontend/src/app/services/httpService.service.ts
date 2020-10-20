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
		this.config = JSON.parse(await this.http.get('assets/config.json', { responseType: 'text' }).toPromise());
	}

	async callFunction(functionName: string, params?: Object)
	{

		let result: any;
		let args = Object.assign({jtoken: localStorage.getItem('adminJToken')}, params)
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
