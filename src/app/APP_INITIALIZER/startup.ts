import { Injectable } from '@angular/core';

// declare var AMapLoader

@Injectable({ providedIn: 'root' })
export class StartupService {
  constructor() {}

  //程序初始化
  async initApp(resolve, reject): Promise<void> {
    try {
      //程序初始化的时候可以在这里
      console.log('程序初始化');

      // resolve();
    } catch (e) {
      // reject(e)
      console.log(e);
    }
    resolve();
  }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.initApp(resolve, reject);
    });
  }
}
