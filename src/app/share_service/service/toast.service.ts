import { Injectable } from '@angular/core';
import {
  ToastController,
  AlertController,
  ActionSheetController,
} from '@ionic/angular';

@Injectable()
export class ToastService {
  constructor(
    public toastController: ToastController,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController
  ) {}

  async hintAlert(msg: string): Promise<void> {
    const alert = await this.toastController.create({
      header: '提示',
      message: msg,
      color: 'medium',
      position: 'middle',
      cssClass: 'warn',
      duration: 500,
    });
    alert.present();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async bubyAlert(msg: string, callback: Function, back = true) {
    const alert = await this.alertController.create({
      header: '提示',
      message: msg,
      backdropDismiss: back,
      buttons: [
        {
          text: '否',
          handler: () => {
            callback(false);
          },
        },
        {
          text: '是',
          handler: () => {
            callback(true);
          },
        },
      ],
    });
    await alert.present();
  }

  async navigate(callback) {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: '高德地图',
          handler: () => {
            callback(1);
          },
        },
        {
          text: '百度地图',
          handler: () => {
            callback(2);
          },
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });
    await actionSheet.present();
  }
}
