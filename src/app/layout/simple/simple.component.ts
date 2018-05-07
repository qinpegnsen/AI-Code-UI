import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Setting} from "../../public/setting/setting";
import {SettingUrl} from "../../public/setting/setting_url";
import {Router} from "@angular/router";

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SimpleComponent implements OnInit {
  public app = Setting.APP; //平台信息
  public buildProUrl = SettingUrl.ROUTERLINK.buildPro.proInfo;    //新建项目的路径
  constructor(public router: Router) {
  }

  ngOnInit() {
  }

  goAddPro() {
    this.router.navigate([this.buildProUrl], {'queryParams': {'type': 'add'}});
  }

  /**
   * 退出登录
   */
  logout() {
    sessionStorage.removeItem("token");
    this.router.navigate([SettingUrl.ROUTERLINK.login.login]); //路由跳转（登录页面）
  }
}
