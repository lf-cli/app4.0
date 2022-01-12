import { ErrorHandler, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { appRestful } from '../app.restful';
import { TimeoutError } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpserviceService {
  public token = '';
  public httpHeader: any = '';
  public commonUrl = '';
  constructor(public http: HttpClient) {
    this.commonUrl = appRestful.getTestUrl();
  }
  //封装get请求 需要两个参数
  async httpGet(url, params) {
    const commonUrl = this.commonUrl;
    // console.log(localStorage.getItem('authentication'),);

    const authentication = localStorage.getItem('authentication');

    const httpOption = {
      headers: new HttpHeaders({
        authentication: authentication || '',
      }),
      params,
    };
    // console.log(authentication, 'authentication');
    // console.log(commonUrl + url, 'url');
    // console.log(httpOption, 'param');

    return await new Promise((resolve, reject) => {
      this.http
        .get(commonUrl + url, httpOption)
        .pipe(timeout(10000))
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            // console.log('aaaa');
            let msg;
            if (err instanceof TimeoutError) {
              msg = '服务器连接超时';
            } else if (err instanceof HttpErrorResponse) {
              msg = '网络连接异常';
            } else {
              msg = '未知原因，请求失败';
            }
            reject(msg);
          }
        );
    });
  }

  //POTS请求 需要三个参数
  async httpPost(url, params) {
    const authentication = localStorage.getItem('authentication');
    const httpOption = {
      headers: new HttpHeaders({
        authentication: authentication || '',
      }),
    };
    // console.log(authentication, 'authentication');
    // console.log(this.commonUrl + url, 'url');
    // console.log(httpOption, 'param');
    return await new Promise((resolve, reject) => {
      this.http.post(this.commonUrl + url, params, httpOption).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  //PUT请求

  //DELETE请求
  async httpDelete(url, params) {
    const authentication = localStorage.getItem('authentication');
    const httpOption = {
      headers: new HttpHeaders({
        authentication: authentication || '',
      }),
      params,
    };
    // console.log(authentication, 'authentication');
    // console.log(this.commonUrl + url, 'url');
    // console.log(httpOption, 'param');
    return await new Promise((resolve, reject) => {
      this.http.delete(this.commonUrl + url, httpOption).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
