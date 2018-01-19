import { Component, OnInit } from '@angular/core';
import {ProjectStepsComponent} from "../project-steps/project-steps.component";
import {Setting} from "../../../public/setting/setting";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BuildProjectService} from "../build-project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SettingUrl} from "../../../public/setting/setting_url";
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
  type: string;                               //路由携带的参数

  constructor(public fb: FormBuilder,
              public buildProjectService:BuildProjectService,
              public routeInfo: ActivatedRoute,
              public router: Router,
              public steps:ProjectStepsComponent) {
    //企业注册表单项校验
    this.validateForm = this.fb.group({
      account: ['', [Validators.required]],
      password: ['', [Validators.required]],
      type: ['Git'],
      home: ['', [Validators.required]],
      description: ['', [Validators.required]],
      projectCode: [''],
    });
    this.steps.current = 3;//添加项目的进度条
  }

  ngOnInit() {
    let me = this;
    me.type = me.routeInfo.snapshot.queryParams['type'];
    if (me.type == 'edit') {
      me.loadRepository();
    }
  }

  /**
   * 编辑时load仓库信息
   * @param event
   * @param curPage
   */
  public loadRepository() {
    let me = this;
    if(sessionStorage.getItem('repositoryCode')){
      let data={
        code:sessionStorage.getItem('repositoryCode')
      };
      $.when(me.buildProjectService.loadRepository(data)).done(data => {
        console.log("█ data ►►►",  data);
        me.validateForm = me.fb.group({
          account: [data.account, [Validators.required]],
          password: [data.password, [Validators.required]],
          type: [data['type']],
          home: [data.home, [Validators.required]],
          description: [data.description, [Validators.required]],
          projectCode: [data.projectCode],
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
        sessionStorage.setItem('repositoryCode',data.code);
        this.router.navigate([SettingUrl.ROUTERLINK.project.detail], {queryParams: {code: sessionStorage.getItem('projectCode')}});
      }
    })
  }

}
