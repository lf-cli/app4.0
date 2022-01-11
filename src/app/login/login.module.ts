import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { CordovaService } from '../share_service/service/cordova.service';
import { ToastService } from '../share_service/service/toast.service';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [LoginPage],
  providers: [CordovaService, ToastService],
})
export class LoginPageModule {}
