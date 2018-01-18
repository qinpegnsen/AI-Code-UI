import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Page } from './../../../public/util/page';
declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public projectList: Page = new Page();

  constructor(public project: ProjectService) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    $.when(this.project.getProjectList()).always(data => {
      // this._loading = false;//解除锁屏
      console.log(data);
    });
  }

}
