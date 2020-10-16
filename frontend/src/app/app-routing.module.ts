import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicFrameComponent } from './public-frame/public-frame.component';
import { PrivateFrameComponent } from './private-frame/private-frame.component';

import { AdminFrameComponent } from './admin-frame/admin-frame.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRequestPasswordComponent } from './admin-request-password/admin-request-password.component';
import { AdminChangePasswordComponent } from './admin-change-password/admin-change-password.component';
import { AdminChangePasswordSuccessComponent } from './admin-change-password-success/admin-change-password-success.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FilterListComponent } from './filter-list/filter-list.component';

import { LoginPageComponent } from './login-page/login-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordSuccessComponent } from './reset-password-success/reset-password-success.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePasswordSuccessComponent } from './change-password-success/change-password-success.component';



const routes: Routes = 
[
	{
		path: 'public', component: PublicFrameComponent,
		children:
			[
				//{ path: '**', redirectTo: 'welcome' }
			]
	},
	{
		path: 'login', component: LoginPageComponent,
		children:
			[
				{ path: 'login', component: LoginPageComponent },
				{ path: 'reset-password', component: ResetPasswordComponent },
				{ path: 'reset-password-success', component: ResetPasswordSuccessComponent },
				{ path: 'change-password', component: ChangePasswordComponent },
				{ path: 'change-password-success', component: ChangePasswordSuccessComponent },
				{ path: '**', redirectTo: 'login' }
			]
	},
	{
		path: 'private', component: PrivateFrameComponent,
		children:
			[
				
			]
	},
	{
		path: 'admin', component: AdminFrameComponent,
		children:
			[
				{path: 'login', component: AdminLoginComponent},
				{path: 'password-request', component: AdminRequestPasswordComponent},
				{path: 'change-password', component: AdminChangePasswordComponent},
				{path: 'change-password-success', component: AdminChangePasswordSuccessComponent},
				{path: 'admin-page', component: AdminPageComponent,
					children:
					[
						{path:'admin-list', component: AdminListComponent},
						{path: 'categories', component: CategoryListComponent},
						{path: 'filters', component: FilterListComponent},
						{path: 'products', component: ProductListComponent}
						
					]
				}

			]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
