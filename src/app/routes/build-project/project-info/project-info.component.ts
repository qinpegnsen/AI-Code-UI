import { Component, OnInit } from '@angular/core';
import {Setting} from "../../../public/setting/setting";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BuildProjectService} from "../build-project.service";
import {ProjectStepsComponent} from "../project-steps/project-steps.component";
declare var $: any;
@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {

  guideLang: any = Setting.PAGEMSG;                  //引导语
  validateForm: FormGroup;
  constructor(public fb: FormBuilder,
              public buildProjectService:BuildProjectService,
              public steps:ProjectStepsComponent) {
    //企业注册表单项校验
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      englishName: ['', [Validators.required]],
      databaseType: ['Mysql'],
      copyright: ['', [Validators.required]],
      author: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      description: [''],
      language: [''],
      basePackage: [''],
    });
    this.steps.current = 0;//添加项目的进度条
  }

  ngOnInit() {
    this.loadProInfo();
  }

  /**
   * 查询企业信息
   * @param data
   */
  loadProInfo() {
    let me = this;
    if(sessionStorage.getItem('projectCode')){
      let data={
        code:sessionStorage.getItem('projectCode')
      };
      $.when(me.buildProjectService.loadProject(data)).done(data => {
        this.validateForm = this.fb.group({
          name: [data.name, [Validators.required]],
          englishName: [data.englishName, [Validators.required]],
          databaseType: [data.databaseType],
          copyright: [data.copyright, [Validators.required]],
          author: [data.author, [Validators.required]],
          phone: [data.phone, [Validators.required]],
          description: [data.description],
          language: [data.language],
          basePackage: [data.basePackage],
        });
      })
    }
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
   * 点击下一步按钮时会提交表单，成功后跳转下一步
   * @param $event
   * @param value
   */

  submitRegisterForm = ($event, value) => {
    $event.preventDefault();
    let me = this;
    $.when(me.buildProjectService.buildProject(value)).done(data => {
      if(data){
        sessionStorage.setItem('projectCode',data.code);
        me.buildProjectService.routerSkip(1);
      }
    })
  };

}
