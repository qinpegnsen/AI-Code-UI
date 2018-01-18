import { Component, OnInit } from '@angular/core';
import {ProjectStepsComponent} from "../project-steps/project-steps.component";
import {Setting} from "../../../public/setting/setting";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BuildProjectService} from "../build-project.service";
declare var $: any;

@Component({
  selector: 'app-project-repository',
  templateUrl: './project-repository.component.html',
  styleUrls: ['./project-repository.component.css']
})
export class ProjectRepositoryComponent implements OnInit {

  guideLang: any = Setting.PAGEMSG;                  //引导语
  validateForm: FormGroup;
  _loading: boolean = false;                 //查询时锁屏,默认关闭

  constructor(public fb: FormBuilder,
              public buildProjectService:BuildProjectService,
              public steps:ProjectStepsComponent) {
    //企业注册表单项校验
    this.validateForm = this.fb.group({
      account: ['', [Validators.required]],
      password: ['', [Validators.required]],
      type: ['Mysql',[Validators.required]],
      home: ['', [Validators.required]],
      description: ['', [Validators.required]],
      projectCode: [''],
    });
    this.steps.current = 3;//添加项目的进度条
  }

  ngOnInit() {
  }

  /**
   * 获取每个输入框的状态
   * @param name
   * @returns {AbstractControl}
   */
  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  /**
   * 跳转页面
   */
  skipTo(step,type) {
    this.buildProjectService.routerSkip(step,type);
  }

  /**
   * 完成
   */
  nextStep($event,value){
    $event.preventDefault();
    $.when(this.buildProjectService.buildRepository(value)).always(data => {
      this._loading = false;//解除锁屏
      if (data) {
        console.log("█ data ►►►",  data);
      }
    })
  }

}
