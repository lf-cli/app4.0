import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  isClick = true;
  url1: string;
  url2: string;
  url3: string;
  url4: string;

  constructor() {}
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
  }
}
