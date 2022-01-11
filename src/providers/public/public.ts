import { Injectable } from '@angular/core';

import {
  AlertController,
  LoadingController,
  ToastController,
  Platform,
} from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import {
  FileTransfer,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Injectable()
export class PublicProvider {
  /*公共post提交頭*/

  constructor(
    public http: HttpserviceService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private transfer: FileTransfer,
    private file: File,
    private appVersion: AppVersion,
    private fileOpener: FileOpener,
    private androidPermissions: AndroidPermissions,
    public toastCtrl: ToastController,
    public platform: Platform
  ) {
    // console.log('Hello PublicProvider Provider');
  }

  //检查版本更新
  new_version(callback) {
    var url = '/appUpdateInfo';
    return this.http.httpGet(url, { appName: 'sucheng' }).then((data) => {
      callback(data);
    });
  }

  /***** 自动更新APP版本  开始 ******************************/
  public now_version = ''; //当前版本
  public new_app = {
    //最新版本
    new_version: '', //版本号
    text: '', //更新简介
    url: '', //下载地址
  };
  public has_new: boolean = false;
  get_now_version() {
    var _that = this;
    this.appVersion.getVersionNumber().then((data) => {
      _that.now_version = data;
    });
    return _that.now_version;
  }
  check_version() {
    var _that = this;

    //服务器端获取最新版
    this.new_version((data) => {
      console.log(data);
      _that.new_app.new_version = data.data.version;
      _that.new_app.text = data.data.text;
      _that.new_app.url = data.data.file_url;
    });

    console.log('_that.new_app');
    console.log(_that.new_app);

    this.appVersion.getVersionNumber().then((data) => {
      _that.now_version = data;
    });

    console.log('_that.now_version = ' + _that.now_version);

    //当前版本
    let nowVersionNum = parseInt(
      this.now_version.toString().replace(new RegExp(/(\.)/g), '0')
    );
    // console.log('当前版本：'+nowVersionNum);
    let newVersionNum = parseInt(
      this.new_app.new_version.toString().replace(new RegExp(/(\.)/g), '0')
    );
    if (nowVersionNum < newVersionNum) {
      this.has_new = true;
    }

    console.log('nowVersionNum = ' + nowVersionNum);
    console.log('newVersionNum = ' + newVersionNum);
  }

  async presentToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  autoUpdateApp() {
    setTimeout(async () => {
      await this.appVersion.getVersionNumber().then((data) => {
        this.now_version = data;
      });
      // this.now_version = '1.0.0';
      //服务器端获取最新版
      await this.new_version((data) => {
        this.new_app.new_version = data.data.version;
        this.new_app.text = data.data.text;
        this.new_app.url = data.data.file_url;
        this.updateAPP();
      });
    }, 3000);
  }

  async updateAPP() {
    // this.check_version();
    //当前版本
    let nowVersionNum = parseInt(
      this.now_version.toString().replace(new RegExp(/(\.)/g), '0')
    );
    console.log('当前版本：' + nowVersionNum);
    let newVersionNum = parseInt(
      this.new_app.new_version.toString().replace(new RegExp(/(\.)/g), '0')
    );
    console.log('最新版本：' + newVersionNum);
    if (nowVersionNum < newVersionNum) {
      let confirm = await this.alertCtrl.create({
        header: '有新版本发布，是否下载更新？',
        message: this.new_app.text,
        buttons: [
          {
            text: '取消',
            handler: () => {
              console.log('Disagree clicked');
              // return false;
              this.check_version();
            },
          },
          {
            text: '确认',
            handler: () => {
              this.permissionsFun();
              //this.download();
            },
          },
        ],
      });
      confirm.present();
    } else {
      this.presentToast('当前已是最新版本');
    }
  }

  async download() {
    let timer;
    if (this.isAndroid()) {
      var _that = this;
      const fileTransfer: FileTransferObject = this.transfer.create();

      //目录创建文件夹 new Date().getTime()
      this.file.createDir(this.file.externalRootDirectory, 'satellite', false);
      let externalRootDirectory =
        this.file.externalRootDirectory + 'temp/satellite/wuchang.apk';
      console.log('this.new_app.url');
      console.log(this.new_app.url);

      console.log('externalRootDirectory');
      console.log(externalRootDirectory);

      let num: number = 1;
      fileTransfer.onProgress((event: ProgressEvent) => {
        num = Math.floor((event.loaded / event.total) * 100);
      });

      let loading = await _that.loadingCtrl.create({
        message: '下载进度：' + num + '%',
      });
      loading.present();

      debugger;
      fileTransfer.download(this.new_app.url, externalRootDirectory).then(
        (entry) => {
          console.log('下载成功: ' + entry.toURL());
          _that.fileOpener
            .open(entry.toURL(), 'application/vnd.android.package-archive')
            .then(() => console.log('File is opened'))
            .catch((e) => console.log('Error openening file' + e));
        },
        async (error) => {
          console.log(error);

          clearInterval(timer);
          loading.dismiss();
          let confirm = await this.alertCtrl.create({
            header: '请开启存储权限',
            message: '权限被拒绝，请在手机设置里手动开启存储权限',
            buttons: [
              {
                text: '取消',
                handler: () => {
                  console.log('Disagree clicked');
                  // return false;
                  //this.check_version()
                  loading.dismiss();
                },
              },
              {
                text: '确认',
                handler: () => {
                  loading.dismiss();
                  this.download();
                },
              },
            ],
          });
          confirm.present();

          return false;
        }
      );

      timer = setInterval(() => {
        document.getElementsByClassName('loading-content')[0].innerHTML =
          '下载进度' + num + '%';
        if (num >= 99) {
          clearInterval(timer);
          loading.dismiss();
        }
      }, 300);
    }

    // if (this.isIos()) {
    //   this.openUrlByBrowser("这里边填写下载iOS地址");
    // }
  }

  //检查权限
  permissionsFun() {
    this.androidPermissions
      .checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      .then(
        (result) => {
          if (!result.hasPermission) {
            this.androidPermissions
              .requestPermissions([
                this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
              ])
              .then((result) => {
                //弹出弹框是否允许
                if (result.hasPermission) {
                  //点击允许
                  this.download();
                  // console.log("允许使用LOCATION权限");
                } else {
                  //点击拒绝
                  // console.log("拒绝使用LOCATION权限");
                  //this.platform.exitApp();//退出APP
                }
              });
          } else {
            this.download();
            // console.log("已允许位置权限" + result.hasPermission);
          }
        },
        (err) => {
          this.androidPermissions.requestPermission(
            this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
          );
        }
      );
  }

  /**
   * 通过浏览器打开url
   */
  openUrlByBrowser(url: string): void {
    //this.inAppBrowser.create(url, '_system');
  }

  /**
   * 是否真机环境
   * @return {boolean}
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   * @return {boolean}
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   * @return {boolean}
   */
  isIos(): boolean {
    return (
      this.isMobile() &&
      (this.platform.is('ios') ||
        this.platform.is('ipad') ||
        this.platform.is('iphone'))
    );
  }

  /***** 自动更新APP版本  结束 ******************************/
}
