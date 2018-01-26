import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../project.service';
import {SettingUrl} from "../../../public/setting/setting_url";
declare var $: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public editorOptions = {
    theme: 'vs-dark',
    language: 'sql',
    scrollBeyondLastLine: false,
    readOnly: true,
  };
  public projectCode: string;
  public projectData: any = {};
  public code: string;    //sql 信息
  public framslist: any;    //技术信息
  public repositoryInfo: any;    //技术信息

  public jobList :any= new Array();   //构建历史


  constructor(public project: ProjectService,
              public route: ActivatedRoute,
              public router: Router) {
  }

  ngOnInit() {
    this.projectCode = this.route.snapshot.queryParams['code'];
    $.when(this.project.getDetail(this.projectCode)).always(data => {
      this.projectData = data;
      this.jobList = data.projectJobList;
      this.code = data.projectSqlList[0].tsql;
      this.framslist = data.projectFramworkList;
      this.repositoryInfo = data.projectRepositoryAccountList[0];
    });
  }

  goBack() {
    this.router.navigate(['/main/project']);
  }

  /**
   * 跳转页面
   * @param step 跳转到的哪步
   * @param type 新增还是修改
   */
  skipTo(step, type) {
    this.project.routerSkip(step, type, this.projectCode);
  }

  /**
   * 生成任务
   */
  buildTask() {
    this.excuteTask();
  }

  /**
   * 跳转到日志页面
   */
  linkLogs(code){
    this.router.navigate([SettingUrl.ROUTERLINK.project.logs],{'queryParams': {'code': code}});
  }

  /**
   * 执行任务
   */
  excuteTask() {
    this.router.navigate([SettingUrl.ROUTERLINK.project.logs],{'queryParams': {'code': this.projectCode}});
  }
}
