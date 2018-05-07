import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Setting} from "../../../public/setting/setting";
import {Router} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd";
import {LoginService} from "../login.service";
import {SettingUrl} from "../../../public/setting/setting_url";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  array = ['../../../assets/img/1.jpg'];//广告banner
  validateForm: FormGroup;//登录的表单
  app = Setting.APP; //平台基本信息
  account: string; //登录名
  pwd: string; //密码
  registerUrl: string = SettingUrl.ROUTERLINK.login.reg; //注册页面路由
  //用于登录时的表单
  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
  }

  constructor(public fb: FormBuilder, public router: Router, public _notification: NzNotificationService, public loginService: LoginService) {
  }

  ngOnInit() {
    let me = this;
    /**
     *广告banner定时器
     */
    setTimeout(_ => {
      me.array = ['../../../assets/img/1.jpg'];
    }, 5000);

    /**
     * 用于登录时的表单验证
     * @type {FormGroup}
     */
    me.validateForm = this.fb.group({
      account: [null, [Validators.required]],
      pwd: [null, [Validators.required]],
      remember: [true],
    });

    // //判断是否已经登录，已经登录，引导进入首页
    // let loginCookie = this.cookieService.get(Setting.cookie.szhLinfoStore);
    // if (loginCookie) this.router.navigate([SettingUrl.ROUTERLINK.store.home]); //路由跳转（首页）
  }

  /**
   * 登录
   * @param $event
   * @param value
   */
  login = () => {
    let me = this;
    if (!this.account) {
      me._notification.error('警告', "用户名必填！");
      return false;
    }
    if (!this.pwd) {
      me._notification.error('警告', "密码必填！");
      return false;
    }
    let ret: any = this.loginService.login(this.account, this.pwd);
    if (ret.success) {
      me._notification.success('成功', "登录成功！");
      sessionStorage.setItem('token', ret.data); //设置token
      this.router.navigate([SettingUrl.ROUTERLINK.project.list]); //路由跳转（首页）
    } else {
      me._notification.error('警告', ret.info);
    }
  };


}
