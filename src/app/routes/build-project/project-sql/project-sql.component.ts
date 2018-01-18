import {Component, OnInit} from '@angular/core';
import {ProjectStepsComponent} from "../project-steps/project-steps.component";
import {Setting} from "../../../public/setting/setting";
import {BuildProjectService} from "../build-project.service";
declare var $: any;

@Component({
  selector: 'app-project-sql',
  templateUrl: './project-sql.component.html',
  styleUrls: ['./project-sql.component.css']
})
export class ProjectSqlComponent implements OnInit {

  //代码Code编辑器示例所需配置及初始内容
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';
  _loading: boolean = false;                 //查询时锁屏,默认关闭
  guideLang: any = Setting.PAGEMSG;                  //引导语

  constructor(public steps: ProjectStepsComponent,
              public buildProjectService: BuildProjectService) {
    this.steps.current = 1;//添加项目的进度条
  }

  ngOnInit() {
  }

  /**
   * 跳转页面
   */
  skipTo(step) {
    this.buildProjectService.routerSkip(step);
  }

  /**
   * 提交表单
   * 1.关联sql
   * 2.执行脚本
   */
  nextStep($event) {
    $event.preventDefault();
    let me = this;
    let data = {
      projectCode: sessionStorage.getItem('projectCode'),//	项目编码
      tsql: me.code//sql脚本
    };
    //关联sql
    $.when(me.buildProjectService.buildProjectSql(data)).always(data => {
      me._loading = false;//解除锁屏
      if (data) {
        //执行脚本
        me.initSql(sessionStorage.getItem('projectCode'));
      }
    })
  }

  /**
   * 执行脚本
   * @param code 项目编码
   */
  initSql(code) {
    let me = this;
    let data = {
      code:code,//	项目编码
    };
    $.when(me.buildProjectService.projectInit(data)).always(data => {
      me._loading = false;//解除锁屏
      console.log("█ data ►►►",  data);
      if (true) {
        me.buildProjectService.routerSkip(2);
      }
    })
  }
}
