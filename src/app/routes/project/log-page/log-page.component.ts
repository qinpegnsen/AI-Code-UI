import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectService} from "../project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
declare var $: any;

@Component({
  selector: 'app-log-page',
  templateUrl: './log-page.component.html',
  styleUrls: ['./log-page.component.css']
})
export class LogPageComponent implements OnInit ,OnDestroy{
  public logInfo: any=new Array();          //日志信息
  public code: string;                      //项目编码
  public timer: any;                        //定时器
  public home: any;                         //仓库的地址,当检测到日志打印完之后跳转到仓库的地址

  constructor(public projectService: ProjectService,
              public router: Router,
              public location: Location,
              public routerInfo: ActivatedRoute) {
  }

  ngOnInit() {
    let me = this;
    me.code = me.routerInfo.snapshot.queryParams['code'];
    me.home = me.routerInfo.snapshot.queryParams['home'];
    me.getLog()
  }

  /**
   * 组件销毁的时候执行的发方法
   */
  ngOnDestroy(){
    let me=this;
    window.clearInterval(me.timer);
  }

  getLog() {
    let me=this;
    let data = {
      code: this.code
    };
    $.when(this.projectService.excuteTask(data)).always(result => {
      if(result){
        let taskCode = result.code;
        me.continueRequest(taskCode);
      }
    });
  }

  /**
   * 持续的请求生成日志
   * @param taskCode
   */
  continueRequest(taskCode){
      let me = this,init:number=1;
      me.timer=setInterval(()=>{
        let data = {
          curPage: ++init,
          pageSize: sessionStorage.getItem('code')==me.code?init==2?20:3:3,
          code: taskCode,//任务编码
        };
        $.when(me.projectService.getLogsList(data)).always(data => {
          sessionStorage.setItem('code',me.code);
          me.logInfo.push(data.voList);
        });
      },2000);
  }

  /**
   * 返回
   */
  goBack() {
    this.location.back();
  }
}
