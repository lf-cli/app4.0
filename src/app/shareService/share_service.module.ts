import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AmapService } from './service/amap.service';
import { CordovaService } from './service/cordova.service';
import { ToastService } from './service/toast.service';
import { updateService } from './service/autoUpdate';
// import { AppAvailability } from '@ionic-native/app-availability/ngx';

//路由守卫
//自定义服务
const service = [ToastService, updateService, CordovaService, AmapService];

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [...service],
})
export class ShareServiceModule {}
