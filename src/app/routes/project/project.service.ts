import { Injectable } from '@angular/core';
import { AjaxService } from '../../public/service/ajax.service';
import { SettingUrl } from '../../public/setting/setting_url';
import { NzNotificationService } from 'ng-zorro-antd';
import {Router} from "@angular/router";

declare var $: any;
@Injectable()
export class ProjectService {

    constructor(public _notification: NzNotificationService,public router: Router) { }

    /**
     * 获取项目列表
     * @param curPage   当前页
     * @param pageSize  分页大小
     */
    getProjectList(curPage: number = 1, pageSize: number = 12) {
        const me = this, defer = $.Deferred();  // 封装异步请求结果
        AjaxService.get({
            url: SettingUrl.URL.projectCtrl.list,
            data: { curPage: curPage, pageSize: pageSize },
            success: (res) => {
                if (res.success) {
                    defer.resolve(res.data);
                } else {
                    me._notification.error(`出错了`, res.info);
                }
            },
            error: () => {
                me._notification.error(`出错了`, '失败，请稍后重试');
            }
        });
        return defer.promise();
    }

    /**
     * 查询项目详情
     * @param code 项目编号
     */
    getDetail(code: string) {
        const me = this, defer = $.Deferred();  // 封装异步请求结果
        AjaxService.get({
            url: SettingUrl.URL.projectCtrl.load,
            data: { code: code },
            success: (res) => {
                if (res.success) {
                    defer.resolve(res.data);
                } else {
                    me._notification.error(`出错了`, res.info);
                }
            },
            error: () => {
                me._notification.error(`出错了`, '失败，请稍后重试');
            }
        });
        return defer.promise();
    }

  /**
   * 根据操作步骤跳到相应页面
   * @param current （当前步骤）
   */
  routerSkip(current, type) {
    switch (current) {
      case 0 :
        this.router.navigate([SettingUrl.ROUTERLINK.buildPro.proInfo], {'queryParams': {'type': type}});
        break;
      case 1 :
        this.router.navigate([SettingUrl.ROUTERLINK.buildPro.proSql], {'queryParams': {'type': type}});
        break;
      case 2 :
        this.router.navigate([SettingUrl.ROUTERLINK.buildPro.proFrames], {'queryParams': {'type': type}});
        break;
      case 3 :
        this.router.navigate([SettingUrl.ROUTERLINK.buildPro.proRepository], {'queryParams': {'type': type}});
        break;
    }
  }
}
