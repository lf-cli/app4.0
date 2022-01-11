import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemoPagePageRoutingModule } from './demo-page-routing.module';

import { DemoPagePage } from './demo-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemoPagePageRoutingModule
  ],
  declarations: [DemoPagePage]
})
export class DemoPagePageModule {}
