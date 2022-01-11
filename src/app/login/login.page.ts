import { Component, OnInit } from '@angular/core';
import { ToastService } from '../share_service/service/toast.service';
import { Router } from '@angular/router';
import { HttpserviceService } from '../services/httpservice.service';
import { Platform } from '@ionic/angular';
import { PublicProvider } from '../../providers/public/public';

interface User {
  password: string;
  username: string;
  remember: boolean;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userInfo: User = {
    password: '',
    username: '',
    remember: false,
  };

  constructor(
    private toast: ToastService,
    private router: Router,
    private http: HttpserviceService,
    private platform: Platform,
    private PlublicPro: PublicProvider
  ) {
    //防止用户直接杀掉软件
    localStorage.removeItem('historyParams');
    this.PlublicPro.autoUpdateApp();
    this.platform.backButton.subscribe(() => {
      if (this.router.url == '/') {
        navigator['app'].exitApp();
      }
    });
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.remember) {
      this.userInfo = userInfo;
    }
  }

  ngOnInit(): void {}

  login() {
    let params = JSON.parse(JSON.stringify(this.userInfo));
    delete params.remember;
    this.router.navigate(['/tabs']);
    // this.http
    //   .httpPost('/login', params)
    //   .then((res: any) => {
    //     if (res.code === 0) {
    //       localStorage.setItem('authentication', res.data.token);
    //       sessionStorage.setItem('regionId', res.data.regionId);
    //       if (this.userInfo.remember) {
    //         localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
    //       } else {
    //         localStorage.removeItem('userInfo');
    //       }
    //       this.router.navigate(['/tabs']);
    //     }
    //   })
    //   .catch((e) => {
    //     this.toast.hintAlert('账号密码错误');
    //   });
  }
}
