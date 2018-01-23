import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { Page } from './../../../public/util/page';
import {SettingUrl} from "../../../public/setting/setting_url";
declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public projectList: Page = new Page();

  constructor(public project: ProjectService, public router: Router) { }

  ngOnInit() {
    this.queryList();
  }

  /**
   * 查询项目列表
   */
  queryList() {
    $.when(this.project.getProjectList()).always(data => {
      // this._loading = false;//解除锁屏
      this.projectList = data;
    });
  }

  /**
   * 跳转至项目详情
   * @param param0 项目编号
   */
  goDetail({code: code}) {
    this.router.navigate([SettingUrl.ROUTERLINK.project.detail], {queryParams: {code: code}});
  }

  /**
   * 删除项目
   * @param project
   */
  goDel(project){
    let data={
      code:project.code
    };
    $.when(this.project.delPro(data)).always(data => {
      // this._loading = false;//解除锁屏
      this.queryList();

    });
  }

}
