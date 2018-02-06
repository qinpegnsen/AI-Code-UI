import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../project.service";
import {Location} from "@angular/common";
import {isArray} from "util";
import {NzNotificationService} from "ng-zorro-antd";
declare var $: any;

@Component({
  selector: 'app-source-code',
  templateUrl: './source-code.component.html',
  styleUrls: ['./source-code.component.css']
})
export class SourceCodeComponent implements OnInit {

  public code: any;                     //项目编码
  public sourceCode: any;               //项目源码
  public filePath: any;                 //项目路径
  public projectName: any;              //项目中文名
  public description: any;              //项目描述
  public filePathData: any;             //请求后的项目路径信息
  public paths: any = new Array();      //路径的集合
  public editorOptions = {
    theme: 'vs-dark',
    language: 'sql',
    scrollBeyondLastLine: false,
    readOnly: true,
  };

  constructor(public routerInfo: ActivatedRoute,
              public location: Location,
              public _notification: NzNotificationService,
              public router: Router,
              public project: ProjectService) {
  }

  ngOnInit() {
    let me = this;
    me.code = me.routerInfo.snapshot.queryParams['code'];
    me.filePath = me.routerInfo.snapshot.queryParams['filePath'];
    me.projectName = sessionStorage.getItem('projectName');
    me.description = sessionStorage.getItem('description');
    let obj = {type: 'Directory', filePath: me.filePath};
    me.paths.push(obj);
    me.getSourceCode();
  }

  /**
   * 获取源码和路径
   */
  getSourceCode(filePath?, type?) {
    let me = this;
    let data = {
      code: me.code,
      filePath: filePath || me.filePath
    };
    $.when(me.project.getSourceCode(data)).always(result => {
      if (result) {
        if (type == 'File') {
          me.sourceCode = result;
        } else {
          me.filePathData = me.resetData(result);
        }
      }
    });
  }

  /**
   * 增加面包屑的路径
   */
  addPaths(path, type) {
    let me = this;
    let obj = {type: type, filePath: path};
    me.paths.push(obj);
    me.getSourceCode(path, type);
  }

  /**
   * 重组数据（文件夹和文件在一块）
   */
  resetData(result) {
    let directory = new Array(), file = new Array(), me = this;
    if(isArray(result)){
      for (let i = 0; i < result.length; i++) {
        if (result[i].type == 'Directory') {
          directory.push(result[i])
        } else {
          file.push(result[i])
        }
      }
      return directory.concat(file);
    }else {
      me._notification.info(`温馨提示`, '请先进行构建');
      me.goBack();
    }
  }

  /**
   * 点击导航截取路径并加载信息
   * @param path
   * @param type
   * @param type 下标
   */
  slicePaths(path, type, i) {
    let me = this;
    me.paths.splice(i + 1);
    if (type != 'File') {
      me.sourceCode = null;
    }
    me.getSourceCode(path, type);
  }

  /**
   * 返回上一级
   */
  back() {
    let me = this;
    me.paths.pop();
    me.getSourceCode(me.paths[me.paths.length - 1]['filePath']);
  }

  /**
   * 跳转到任务列表页面
   */
  goBack() {
    let me = this;
    this.router.navigate(['/main/project/detail'], {queryParams: {code: me.code}});
  }
}
