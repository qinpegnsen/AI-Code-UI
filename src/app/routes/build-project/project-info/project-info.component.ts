import {Component, OnInit} from '@angular/core';
import {Setting} from "../../../public/setting/setting";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BuildProjectService} from "../build-project.service";
import {ProjectStepsComponent} from "../project-steps/project-steps.component";
import {ActivatedRoute} from "@angular/router";
import {PatternService} from "../../../public/service/pattern.service";
declare var $: any;
@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {

  guideLang: any = Setting.PAGEMSG;                  //引导语
  type: string;                                     //路由携带的参数
  validateForm: FormGroup;
  buildProInfo: any;                                   //当前项目的信息
  routerProjectCode:string;                           //路由传递过来的项目的编码
  constructor(public fb: FormBuilder,
              public buildProjectService: BuildProjectService,
              public routeInfo: ActivatedRoute,
              public pattern: PatternService,
              public steps: ProjectStepsComponent) {
    //企业注册表单项校验
    this.validateForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      englishName: ['', [Validators.required, Validators.maxLength(50),Validators.pattern(this.pattern.letter)]],
      databaseType: ['Mysql'],
      copyright: ['', [Validators.required, Validators.maxLength(50)]],
      author: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(50)]],
      language: ['', [Validators.maxLength(50)]],
      basePackage: ['', [Validators.maxLength(50)]],
    });
    this.steps.current = 0;//添加项目的进度条
  }

  ngOnInit() {
    let me = this;
    me.type = me.routeInfo.snapshot.queryParams['type'];
    me.routerProjectCode = me.routeInfo.snapshot.queryParams['projectCode'];
    me.spectPreStep();
    if (me.type == 'edit') {
      me.loadProInfo();
    }
  }

  /**
   * 检查上一步是否填写，如果没有跳回到上一步或者buildProInfo赋值
   */
  spectPreStep() {
    let me = this;
    if (me.routerProjectCode) {
      sessionStorage.setItem('projectCode', me.routerProjectCode)
    }
    let data = {
      code: me.routerProjectCode || sessionStorage.getItem('projectCode')
    };
    $.when(me.buildProjectService.loadProject(data)).done(data => {
      console.log("█ data ►►►", data);
      me.buildProInfo = data;
    });
  }

  /**
   * 查询项目信息
   * @param data
   */
  loadProInfo() {
    let me = this;
    console.log("█ sessionStorage.getItem('projectCode') ►►►", sessionStorage.getItem('projectCode'));
    if (sessionStorage.getItem('projectCode')) {
      let data = {
        code: sessionStorage.getItem('projectCode')
      };
      console.log("█ data ►►►", data);
      $.when(me.buildProjectService.loadProject(data)).done(data => {
        console.log("█ data ►►►", data);
        me.validateForm = me.fb.group({
          name: [data.name, [Validators.required, Validators.maxLength(50)]],
          englishName: [data.englishName, [Validators.required, Validators.maxLength(50),Validators.pattern(this.pattern.letter)]],
          databaseType: [data.databaseType],
          copyright: [data.copyright, [Validators.required, Validators.maxLength(50)]],
          author: [data.author, [Validators.required, Validators.maxLength(50)]],
          phone: [data.phone, [Validators.required, Validators.maxLength(50)]],
          description: [data.description, [Validators.maxLength(50)]],
          language: [data.language, [Validators.maxLength(50)]],
          basePackage: [data.basePackage, [Validators.maxLength(50)]],
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

  nextStep = ($event, validateForm) => {
    $event.preventDefault();
    let me = this;
    if (!validateForm.valid) {
      return;
    }
    switch (me.type) {
      case 'add': {
        $.when(me.buildProjectService.buildProject(validateForm.value)).done(data => {
          if (data) {
            sessionStorage.setItem('projectCode', data.code);
            me.buildProjectService.routerSkip(1, 'add');
          }
        });
        break;
      }
      case 'edit': {
        validateForm.value['code'] = sessionStorage.getItem('projectCode');
        $.when(me.buildProjectService.modifyProject(validateForm.value)).done(data => {
          if (data) {
            sessionStorage.setItem('projectCode', data.code);
            let type = me.buildProInfo.projectSqlList.length ? 'edit' : 'add';
            me.buildProjectService.routerSkip(1, type);
          }
        });
        break;
      }
    }
  };
}
