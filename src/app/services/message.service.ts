import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private toastCtrl: ToastController) {}

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  async successful(text: string, icon: string) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 1500,
      color: 'primary',
      position: 'top',
      icon: icon,
    });
    toast.present();
  }

  async error(text: string, icon: string) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2500,
      color: 'danger',
      position: 'top',
      icon: icon,
    });
    toast.present();
  }
}
