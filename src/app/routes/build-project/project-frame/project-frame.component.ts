import { Component, OnInit } from '@angular/core';
import {ProjectStepsComponent} from "../project-steps/project-steps.component";
import {Setting} from "../../../public/setting/setting";
import {BuildProjectService} from "../build-project.service";
declare var $: any;
@Component({
  selector: 'app-project-frame',
  templateUrl: './project-frame.component.html',
  styleUrls: ['./project-frame.component.css']
})
export class ProjectFrameComponent implements OnInit {

  guideLang: any = Setting.PAGEMSG;                  //引导语
  _loading: boolean = false;                 //查询时锁屏,默认关闭
  frames: any=new Array();                    //技术框架

  constructor(public steps:ProjectStepsComponent,public buildProjectService:BuildProjectService) {
    this.steps.current = 2;//添加项目的进度条
  }

  ngOnInit() {
    this.queryFramesList();
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
   * 提交表单
   */
  nextStep($event){
    $event.preventDefault();
    let data={
      name:'',
      description:''
    }
    $.when(this.buildProjectService.framesList(data)).always(data => {
      this._loading = false;//解除锁屏
      if (data) {
        this.resetData(data);
      }
    })
  }

  /**
   * 跳转页面
   */
  skipTo() {
    this.buildProjectService.routerSkip(0);
  }

}
