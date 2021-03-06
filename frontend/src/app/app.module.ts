import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminFrameComponent } from './admin-frame/admin-frame.component';
import { PrivateFrameComponent } from './private-frame/private-frame.component';
import { PublicFrameComponent } from './public-frame/public-frame.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordSuccessComponent } from './reset-password-success/reset-password-success.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePasswordSuccessComponent } from './change-password-success/change-password-success.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminChangePasswordComponent } from './admin-change-password/admin-change-password.component';
import { AdminChangePasswordSuccessComponent } from './admin-change-password-success/admin-change-password-success.component';
import { AdminRequestPasswordComponent } from './admin-request-password/admin-request-password.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FilterListComponent } from './filter-list/filter-list.component';
import { RegistrationComponent } from './registration/registration.component';
import { ActivationComponent } from './activation/activation.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductInterfaceComponent } from './product-interface/product-interface.component';
import { MenubarComponent } from './menubar/menubar.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { OrderListComponent } from './order-list/order-list.component';
import { DataSheetComponent } from './data-sheet/data-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminFrameComponent,
    PrivateFrameComponent,
    PublicFrameComponent,
    LoginPageComponent,
    ResetPasswordComponent,
    ResetPasswordSuccessComponent,
    ChangePasswordComponent,
    ChangePasswordSuccessComponent,
    AdminPageComponent,
    AdminListComponent,
    AdminChangePasswordComponent,
    AdminChangePasswordSuccessComponent,
    AdminRequestPasswordComponent,
    CategoryListComponent,
    ProductListComponent,
    FilterListComponent,
    RegistrationComponent,
    ActivationComponent,
    WelcomeComponent,
    ProductInterfaceComponent,
    MenubarComponent,
    ProductComponent,
    CartComponent,
    OrderListComponent,
    DataSheetComponent
  ],
  imports: [
	BrowserModule,
	BrowserAnimationsModule,
	AppRoutingModule,
	FormsModule,
	HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
