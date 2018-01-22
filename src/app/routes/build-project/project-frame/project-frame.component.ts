import { Component, OnInit } from '@angular/core';
import {ProjectStepsComponent} from "../project-steps/project-steps.component";
import {Setting} from "../../../public/setting/setting";
import {BuildProjectService} from "../build-project.service";
import {NzNotificationService} from "ng-zorro-antd";
import {ActivatedRoute} from "@angular/router";
import {isNullOrUndefined} from "util";
declare var $: any;
@Component({
  selector: 'app-project-frame',
  templateUrl: './project-frame.component.html',
  styleUrls: ['./project-frame.component.css']
})
export class ProjectFrameComponent implements OnInit {

  guideLang: any = Setting.PAGEMSG;           //引导语
  _loading: boolean = false;                 //查询时锁屏,默认关闭
  frames: any=new Array();                    //所有的技术框架
  selectFramework: any=new Array();           //选择的技术框架数据集合
  type: string;                               //路由携带的参数
  buildProInfo:any;                           //当前项目的信息
  routerProjectCode:string;                           //路由传递过来的项目的编码
  constructor(public steps:ProjectStepsComponent,
              public _notification:NzNotificationService,
              public routeInfo: ActivatedRoute,
              public buildProjectService:BuildProjectService) {
    this.steps.current = 2;//添加项目的进度条
  }

  ngOnInit() {
    let me = this;
    me.type = me.routeInfo.snapshot.queryParams['type'];
    me.routerProjectCode = me.routeInfo.snapshot.queryParams['projectCode'];
    me.spectPreStep();
    me.queryFramesList();
    if (me.type == 'edit') {
      me.loadSelectFrames();
    }
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
      code: me.routerProjectCode||sessionStorage.getItem('projectCode')
    };
    console.log("█ me.routerProjectCode ►►►",  me.routerProjectCode);
    $.when(me.buildProjectService.loadProject(data)).done(result => {
      me.buildProInfo=data;
      console.log("█ result ►►►",  result);
      if(!isNullOrUndefined(result)){
        if(!result.projectSqlList.length){
          me.skipTo(1,'add')
        }
      }
    });
  }

  /**
   * 查询技术框架列表
   * @param event
   * @param curPage
   */
  public queryFramesList() {
    this._loading = true;//锁屏
    let data={
      curPage:'1',
      pageSize:'999',
    };
    $.when(this.buildProjectService.framesList(data)).always(data => {
      this._loading = false;//解除锁屏
      if (data) {
        this.resetData(data);
      }
    })
  }

  /**
   * 编辑时查询已经选择的框架列表
   * @param event
   * @param curPage
   */
  public loadSelectFrames() {
    let me = this;
    if(me.routerProjectCode||sessionStorage.getItem('projectCode')){
      let data={
        code:me.routerProjectCode||sessionStorage.getItem('projectCode')
      };
      $.when(me.buildProjectService.loadProject(data)).done(data => {
        for(let i=0;i<me.frames.length;i++){
          for(let j=0;j<data.projectFramworkList.length;j++){
            if(me.frames[i]['label']==data.projectFramworkList[j]['frameworkCode']){
              me.frames[i]['checked']=true;
            }
          }
        }
      })
    }
  }

  /**
   * 对数据进行重组
   * @param data
   */
  resetData(data){
    for(let i=0;i<data.voList.length;i++){
      let obj={};
      obj['label']=data.voList[i].code;
      obj['value']=data.voList[i].name;
      this.frames.push(obj);
    }
  }

  /**
   * 跳转页面
   * @param step 跳转到的哪步
   * @param type 新增还是修改
   */
  skipTo(step,type) {
    this.buildProjectService.routerSkip(step,type);
  }

  /**
   * 提交表单
   */
  nextStep($event){
    this.getFrameworkSelect();
    $event.preventDefault();
    let me=this;
    switch (me.type){
      case 'add':{
        if(me.selectFramework==0){
          me._notification.info('小提示','请至少选择一红技术框架')
        }else{
          let arr=new Array();
          console.log("█ me.selectFramework.join(',') ►►►",  me.selectFramework.join(','));
          for(let i=0;i<me.selectFramework.length;i++){
            arr.push({'frameworkCode':me.selectFramework[i],'projectCode':me.routerProjectCode||sessionStorage.getItem('projectCode')})
          }
          console.log("█ arr ►►►",  arr);
          $.when(me.buildProjectService.linkFrames(arr)).always(data => {
            me._loading = false;//解除锁屏
            if (data) {
              me.buildProjectService.routerSkip(3,'add');
            }
          })
        };
        break;
      }
      case 'edit':{
        if(me.selectFramework==0){
          me._notification.info('小提示','请至少选择一红技术框架')
        }else{
          let arr=new Array();
          for(let i=0;i<me.selectFramework.length;i++){
            arr.push({'frameworkCode':me.selectFramework[i],'projectCode':me.routerProjectCode||sessionStorage.getItem('projectCode')})
          }
          console.log("█ arr ►►►",  JSON.stringify(arr));

          $.when(me.buildProjectService.modifyFrames(arr)).always(data => {
            me._loading = false;//解除锁屏
            if (data) {
              let type=me.buildProInfo.projectRepositoryAccountList.length?'edit':'add';
              me.buildProjectService.routerSkip(3,type);
            }
          })
        };
        break;
      }
    }
  }

  /**
   * 获取所选择的技术框架的编码
   */
  getFrameworkSelect(){
    this.selectFramework=[];
    for(let i=0;i<this.frames.length;i++){
      if(this.frames[i].checked){
        this.selectFramework.push(this.frames[i].label)
      }
    }
  }
}
