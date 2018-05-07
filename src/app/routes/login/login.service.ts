import {Injectable} from '@angular/core';
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";

@Injectable()
export class LoginService {

  constructor() {
  }

  /**
   * 用户登录
   * @param account
   * @param pwd
   * @returns {{success: boolean; info: string}}
   */
  login = (account, pwd) => {
    let ret = {success: false, info: "登录失败！"};
    AjaxService.get({
      url: SettingUrl.URL.login.signin,
      data: {account: account, password: pwd},
      async: false,
      success: (res) => {
        ret = res;
      }
    });
    return ret;
  }


  /**
   * 用户注册
   * @param account
   * @param pwd
   * @returns {{success: boolean; info: string}}
   */
  reg = (account, pwd) => {
    let ret = {success: false, info: "注册失败！"};
    AjaxService.post({
      url: SettingUrl.URL.login.reg,
      data: {account: account, password: pwd},
      async: false,
      success: (res) => {
        ret = res;
      }
    });
    return ret;
  }

}
