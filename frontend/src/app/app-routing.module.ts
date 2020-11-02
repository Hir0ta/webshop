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
import { OrderListComponent } from './order-list/order-list.component';

import { RegistrationComponent } from './registration/registration.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ActivationComponent } from './activation/activation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordSuccessComponent } from './reset-password-success/reset-password-success.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePasswordSuccessComponent } from './change-password-success/change-password-success.component';

import { WelcomeComponent } from './welcome/welcome.component';
import { DataSheetComponent } from './data-sheet/data-sheet.component';
import { CartComponent } from './cart/cart.component';
import { ProductInterfaceComponent } from './product-interface/product-interface.component';
import { ProductComponent } from './product/product.component';



const routes: Routes =
	[
		{
			path: 'public', component: PublicFrameComponent,
			children:
				[
					{ path: 'registration', component: RegistrationComponent},
					{ path: 'login', component: LoginPageComponent },
					{ path: 'activate', component: ActivationComponent},
					{ path: 'reset-password', component: ResetPasswordComponent },
					{ path: 'change-password', component: ChangePasswordComponent }
				],
		},

		{
			path: 'private', component: PrivateFrameComponent,
			children:
				[
					{ path: 'welcome', component: WelcomeComponent },
					{ path: 'profile', component: DataSheetComponent },
					{ path: 'cart', component: CartComponent },
					{ path: 'products', component: ProductInterfaceComponent },
					{ path: 'product', component: ProductComponent }
				]
		},
		{
			path: 'admin', component: AdminFrameComponent,
			children:
				[
					{ path: 'login', component: AdminLoginComponent },
					{ path: 'password-request', component: AdminRequestPasswordComponent },
					{ path: 'change-password', component: AdminChangePasswordComponent },
					{ path: 'change-password-success', component: AdminChangePasswordSuccessComponent },
					{
						path: 'admin-page', component: AdminPageComponent,
						children:
							[
								{ path: 'admin-list', component: AdminListComponent },
								{ path: 'categories', component: CategoryListComponent },
								{ path: 'filters', component: FilterListComponent },
								{ path: 'products', component: ProductListComponent },
								{ path: 'orders', component: OrderListComponent }
							]
					}

				]
		},
		{ path: '**', redirectTo: 'public' }
	];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
