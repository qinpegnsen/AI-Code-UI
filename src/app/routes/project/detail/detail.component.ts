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
    let me=this;
    me.projectCode = me.route.snapshot.queryParams['code'];
    $.when(me.project.getDetail(me.projectCode)).always(data => {
      me.projectData = data;
      sessionStorage.setItem('projectName',me.projectData.name);
      sessionStorage.setItem('description',me.projectData.description);
      me.jobList = data.projectJobList;
      me.code = me.enable(data.projectSqlList).tsql;
      me.framslist = data.projectFramworkList;
      me.repositoryInfo = me.enable(data.projectRepositoryAccountList);
    });
  }

  /**
   * 过滤出能够使用的
   */
  enable(data){
    for(let i=0;i<data.length;i++){
      if(data[i].state=='Enable'){
        return data[i]
      }
    }
  }

  /**
   * 跳转到任务列表页面
   */
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
    let me=this;
    me.excuteTask();
  }

  /**
   * 跳转到日志页面
   */
  linkLogs(code,state){
    let me=this;
    me.router.navigate([SettingUrl.ROUTERLINK.project.logs],{'queryParams': {'taskCode': code,'state':state,'home':me.repositoryInfo.home}});
  }

  /**
   * 执行任务
   */
  excuteTask() {
    let me=this;
    me.router.navigate([SettingUrl.ROUTERLINK.project.logs],{'queryParams': {'code': me.projectCode,'home':me.repositoryInfo.home}});
  }
}
