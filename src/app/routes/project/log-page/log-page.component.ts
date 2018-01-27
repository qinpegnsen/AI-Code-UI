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
  public taskCode: string;                  //任务编码
  public timer: any;                        //定时器
  public home: any;                         //仓库的地址,当检测到日志打印完之后跳转到仓库的地址
  public state: any;                        //构建历史状态

  constructor(public projectService: ProjectService,
              public router: Router,
              public location: Location,
              public routerInfo: ActivatedRoute) {
  }

  ngOnInit() {
    let me = this;
    me.code = me.routerInfo.snapshot.queryParams['code'];
    me.taskCode = me.routerInfo.snapshot.queryParams['taskCode'];
    me.home = me.routerInfo.snapshot.queryParams['home'];
    me.state = me.routerInfo.snapshot.queryParams['state'];
    me.getLog();
  }

  /**
   * 组件销毁的时候执行的发方法
   */
  ngOnDestroy(){
    let me=this;
    window.clearInterval(me.timer);
  }

  /**
   * 执行任务生成任务编码，如果构建历史跳转过来的话,就有任务编码直接调用打印日志的方法
   */
  getLog() {
    let me=this;
    if(me.taskCode){
      me.continueRequest(me.taskCode);
      return;
    }
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
      let me = this,init:number=0;
      me.timer=setInterval(()=>{
        if(me.state){
          let size:string;
          if(me.state=='Completed'||me.state=='Error'||me.state=='Waring'){
            size='999';
          }else if(me.state=='Create'||me.state=='Executing'){
            size='20'
          }
          let data = {
            curPage: ++init,
            pageSize: init==1?size:3,
            code: taskCode,//任务编码
          };
          $.when(me.projectService.getLogsList(data)).always(data => {
            sessionStorage.setItem('code',me.code);
            me.logInfo.push(data.voList);
            me.linkHome(data.voList);
          });
        }else{
          let data = {
            curPage: ++init,
            pageSize: sessionStorage.getItem('code')==me.code?init==2?20:3:3,
            code: taskCode,//任务编码
          };
          $.when(me.projectService.getLogsList(data)).always(data => {
            sessionStorage.setItem('code',me.code);
            me.logInfo.push(data.voList);
            me.linkHome(data.voList);
          });
        }
      },2000);
  }

  /**
   * 判断是否结束跳转到仓库页面
   */
  linkHome(data){
    let me=this;
    for(let i=0;i<data.length;i++){
      if(data[i].log=='End'){
        window.open(me.home)
      }
    }
  }

  /**
   * 返回
   */
  goBack() {
    this.location.back();
  }
}
