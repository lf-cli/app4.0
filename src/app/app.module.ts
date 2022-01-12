/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareServiceModule } from './shareService/share_service.module';
//引入请求数据服务
import { HttpClientModule } from '@angular/common/http';
import { StartupService } from './APP_INITIALIZER/startup';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { File } from '@ionic-native/file/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  FileTransfer,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
// import { PublicProvider } from '../providers/public/public';

// eslint-disable-next-line @typescript-eslint/naming-convention
function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

//初始化服务
const APPINIT_PROVIDES = {
  provide: APP_INITIALIZER,
  useFactory: StartupServiceFactory,
  deps: [StartupService],
  multi: true,
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ShareServiceModule,
  ],
  providers: [
    // HttpserviceService,
    InAppBrowser,
    AppAvailability,
    APPINIT_PROVIDES,
    AndroidPermissions,
    File,
    Geolocation,
    FileTransfer,
    FileTransferObject,
    AppVersion,
    FileOpener,
    // PublicProvider,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
