import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

	password1;
	password2;
  constructor() { }

  ngOnInit(): void {
  }

  send(){};

}