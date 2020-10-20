import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/httpService.service';
import { Router } from '@angular/router';
import sha256 from 'crypto-js/sha256';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
  }

  user_name;
  email;
  password1;
  password2;
  registrationSuccess = '';

  async registration()
  {
	if(this.password1 != this.password2)
	{
		alert('A jelszavak nem egyeznek meg!');
		return;
	};

	let result = await this.httpService.callFunction('regUser',
	{
		user_name: this.user_name,
		email: this.email,
		password: sha256(this.password1)
	});

	if(result == true) this.registrationSuccess = "Sikeres regisztráció, az E-mailben kapott linkkel erősítse meg!"
  }

}
