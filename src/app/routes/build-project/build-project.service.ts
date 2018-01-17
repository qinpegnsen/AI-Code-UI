import { Injectable } from '@angular/core';
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
import {NzNotificationService} from "ng-zorro-antd";
import {Router} from "@angular/router";

declare var $: any;
@Injectable()
export class BuildProjectService {

  projectCode:string='';               //存储项目的编码
  constructor(public router: Router,
              public _notification: NzNotificationService) { }

  /**
   * 新建项目
   * @param requestDate
   * @param callback
   */
  buildProject(requestDate: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.projectCtrl.build,
      data: requestDate,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        } else {
          me._notification.error(`出错了`, res.info)
        }
      },
      error: () => {
        me._notification.error(`出错了`, '失败，请稍后重试')
      }
    });
    return defer.promise();
  }

  /**
   * 获取技术框架的数据
   * @param requestDate
   * @param callback
   */
  framesList(requestDate: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.frameworksCtrl.list,
      data: requestDate,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        } else {
          me._notification.error(`出错了`, res.info)
        }
      },
      error: () => {
        me._notification.error(`出错了`, '失败，请稍后重试')
      }
    });
    return defer.promise();
  }

  /**
   * 加载项目的信息
   */
  loadProject(requestDate: any){
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.projectCtrl.load,
      data: requestDate,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        } else {
          me._notification.error(`出错了`, res.info)
        }
      },
      error: () => {
        me._notification.error(`出错了`, '失败，请稍后重试')
      }
    });
    return defer.promise();
  }

  /**
   * 增加技术框架
   * @param requestDate
   * @param callback
   */
  buildFrames(requestDate: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.frameworksCtrl.list,
      data: requestDate,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        } else {
          me._notification.error(`出错了`, res.info)
        }
      },
      error: () => {
        me._notification.error(`出错了`, '失败，请稍后重试')
      }
    });
    return defer.promise();
  }


  /**
   * 根据操作步骤跳到相应页面
   * @param current （当前步骤）
   */
  routerSkip(current) {
    switch (current) {
      case 0 :
        this.router.navigate([SettingUrl.ROUTERLINK.store.proInfo], {replaceUrl: true});
        break;
      case 1 :
        this.router.navigate([SettingUrl.ROUTERLINK.store.proSql], {replaceUrl: true});
        break;
      case 2 :
        this.router.navigate([SettingUrl.ROUTERLINK.store.proFrames], {replaceUrl: true});
        break;
      case 3 :
        this.router.navigate([SettingUrl.ROUTERLINK.store.proRepository], {replaceUrl: true});
        break;
    }
  }
}
