import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/httpService.service';
import { Router } from '@angular/router';
import sha256 from 'crypto-js/sha256';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
  }

  user_name;
  password;
  loginFailed;
  jtoken;

  async login()
  {
	  let result = await this.httpService.callFunction('login',
		  {
			  user_name: this.user_name,
			  password: sha256(this.password),
		  });

	  if (result != false)
	  {
		  localStorage.setItem('JToken', result[0].jtoken );

		  this.router.navigate(['/private/welcome']);
	  }
	  else
	  {
		  localStorage.setItem('JToken', '');
		  this.loginFailed = 'Hibás email vagy jelszó'
	  }

  }

  lostPassword()
  {
	this.router.navigate(['public/reset-password']);
  }

}
