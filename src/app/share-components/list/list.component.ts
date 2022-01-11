import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'src/app/utils/interface/list';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() data: any[];

  columns = [
    {
      title: '网格别名',
    },
    {
      title: '数值',
    },
    {
      title: '操作',
    },
  ];
  constructor(public router: Router) {}

  ngOnInit() {}
}
