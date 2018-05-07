import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {LoginService} from "./login.service";
import {RegComponent} from './reg/reg.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'reg', component: RegComponent}
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent, RegComponent],
  exports: [
    RouterModule
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule {
}
