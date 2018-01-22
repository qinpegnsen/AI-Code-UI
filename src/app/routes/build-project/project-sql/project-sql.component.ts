import {Component, OnInit} from '@angular/core';
import {ProjectStepsComponent} from "../project-steps/project-steps.component";
import {Setting} from "../../../public/setting/setting";
import {BuildProjectService} from "../build-project.service";
import {ActivatedRoute} from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-project-sql',
  templateUrl: './project-sql.component.html',
  styleUrls: ['./project-sql.component.css']
})
export class ProjectSqlComponent implements OnInit {

  //代码Code编辑器示例所需配置及初始内容
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string = '';                                 //sql脚本
  _loading: boolean = false;                        //查询时锁屏,默认关闭
  guideLang: any = Setting.PAGEMSG;                  //引导语
  type: string;                                     //路由携带的参数
  buildProInfo:any;                                   //当前项目的信息
  routerProjectCode:string;                           //路由传递过来的项目的编码
  constructor(public steps: ProjectStepsComponent,
              public routeInfo: ActivatedRoute,
              public buildProjectService: BuildProjectService) {
    this.steps.current = 1;//添加项目的进度条
  }

  ngOnInit() {
    let me = this;
    me.type = me.routeInfo.snapshot.queryParams['type'];
    me.routerProjectCode = me.routeInfo.snapshot.queryParams['projectCode'];
    me.spectPreStep();
  }

  /**
   * 检查上一步是否填写，如果没有跳回到上一步
   */
  spectPreStep(){
    let me=this;
    if(me.routerProjectCode){
      sessionStorage.setItem('projectCode',me.routerProjectCode)
    }
    let data={
      code:me.routerProjectCode||sessionStorage.getItem('projectCode')
    };
    $.when(me.buildProjectService.loadProject(data)).done(result => {
      me.buildProInfo=result;
      if (me.type == 'edit') {
        me.loadProSql();
      }
    });
  }

  /**
   * 查询项目sql信息
   * @param data
   */
  loadProSql() {
    let me = this;
    if (me.routerProjectCode||sessionStorage.getItem('proSqlCode')) {
      console.log("█ expr ►►►",  me.buildProInfo);
      let data = {
        code: me.buildProInfo.projectSqlList[0].code||sessionStorage.getItem('proSqlCode'),
        projectCode: me.routerProjectCode||sessionStorage.getItem('projectCode')
      };
      console.log("█ me.buildProInfo.projectSqlList[0].code ►►►",  me.buildProInfo.projectSqlList[0].code);
      $.when(me.buildProjectService.loadSql(data)).done(data => {
        me.code = data.tsql;
      })
    }
  }

  /**
   * 跳转页面
   * @param step 跳转到的哪步
   * @param type 新增还是修改
   */
  skipTo(step, type) {
    this.buildProjectService.routerSkip(step, type);
  }

  /**
   * 提交表单
   * 1.关联sql
   * 2.执行脚本
   */
  nextStep($event) {
    $event.preventDefault();
    let me = this;
    switch (me.type) {
      case 'add': {
        let data = {
          projectCode: me.routerProjectCode||sessionStorage.getItem('projectCode'),//	项目编码
          tsql: me.code//sql脚本
        };
        //关联sql
        $.when(me.buildProjectService.buildProjectSql(data)).always(data => {
          me._loading = false;//解除锁屏
          if (data) {
            //执行脚本
            sessionStorage.setItem('proSqlCode', data.code);//存储sql code
            me.initSql(sessionStorage.getItem('projectCode'));
          }
        });
        break;
      }
      case 'edit': {
        let data = {
          code:me.buildProInfo.projectSqlList[0].code||sessionStorage.getItem('proSqlCode'),//	tsql编码
          tsql: me.code//sql脚本
        };
        //关联sql
        $.when(me.buildProjectService.modifySql(data)).always(data => {
          me._loading = false;//解除锁屏
          if(true) {
            //执行脚本
            me.initSql(me.routerProjectCode||sessionStorage.getItem('projectCode'));
          }
        });
        break;
      }
    }
  }

  /**
   * 执行脚本
   * @param code 项目编码
   */
  initSql(code) {
    let me = this;
    let data = {
      code: code,//	项目编码
    };
    $.when(me.buildProjectService.projectInit(data)).always(data => {
      me._loading = false;//解除锁屏
      if (true) {
        let type=me.buildProInfo.projectFramworkList.length?'edit':'add';
        me.buildProjectService.routerSkip(2,type);
      }
    })
  }
}
