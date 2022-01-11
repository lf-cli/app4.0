import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';

//自定义指令
const directive = [];

//公用组件
const component = [HeaderComponent, ListComponent];

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule],
  declarations: [...component, ...directive],
  exports: [...component, ...directive],
})
export class ShareComponentsModule {}
