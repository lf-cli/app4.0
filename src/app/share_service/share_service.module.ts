import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AmapService } from './service/amap.service';
import { CordovaService } from './service/cordova.service';
import { ToastService } from './service/toast.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
// import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

const cordovaService = [
  AndroidPermissions,
  Device,
  AppVersion,
  OpenNativeSettings,
  Diagnostic,
];

//路由守卫
//自定义服务
const service = [ToastService, CordovaService, AmapService, ...cordovaService];

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [...service],
})
export class ShareServiceModule {}
