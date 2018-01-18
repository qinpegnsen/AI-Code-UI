import { Injectable } from '@angular/core';
import { AjaxService } from '../../public/service/ajax.service';
import { SettingUrl } from '../../public/setting/setting_url';
import { NzNotificationService } from 'ng-zorro-antd';

declare var $: any;
@Injectable()
export class ProjectService {

    constructor(public _notification: NzNotificationService) { }

    /**
     * 获取项目列表
     * @param curPage   当前页
     * @param pageSize  分页大小
     */
    getProjectList(curPage: number = 1, pageSize: number = 10) {
        const me = this, defer = $.Deferred();  // 封装异步请求结果
        AjaxService.post({
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
}
