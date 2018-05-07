import {Component, OnInit} from '@angular/core';
import {Setting} from "../../../public/setting/setting";
import {NzNotificationService} from "ng-zorro-antd";
import {LoginService} from "../login.service";
import {SettingUrl} from "../../../public/setting/setting_url";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {
  app = Setting.APP; //平台基本信息
  account: string; //注册账户
  pwd: string; //密码
  loginUrl: string = SettingUrl.ROUTERLINK.login.login; //登录

  constructor(public _notification: NzNotificationService, public loginService: LoginService, public router: Router) {
  }

  ngOnInit() {
  }

  /**
   * 注册
   * @returns {boolean}
   */
  reg() {
    let me = this;
    if (!this.account) {
      me._notification.error('警告', "用户名必填！");
      return false;
    }
    if (!this.pwd) {
      me._notification.error('警告', "密码必填！");
      return false;
    }
    let ret: any = me.loginService.reg(this.account, this.pwd);
    if (ret.success) {
      me._notification.success('成功', "注册成功，请登录！");
      this.router.navigate([SettingUrl.ROUTERLINK.login.login]); //路由跳转（去登录页面）
    } else {
      me._notification.error('警告', ret.info);
    }
  }

}
