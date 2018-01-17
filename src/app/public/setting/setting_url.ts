/*接口访问路径配置*/

export class SettingUrl {
  // 接口通讯url集合
  static URL: any = {
    /**
     * 基础路径配置
     */
    base: {
      enum: '/res/enum/',            //获取枚举接口
      uuid: '/upload/basic/uid'    //获取上传图片的编码
    },
    /**
     * 项目管理控制器
     */
    projectCtrl: {
      build: '/project/build',//（post）创建项目
      delete: '/project/delete',//（delete）删除项目
      init: '/project/init',//（put）执行脚本
      list: '/project/list',//（get）查询项目信息集合 按照时间顺序倒叙排序
      load: '/project/load',//（get）查询一个详情信息
      modify: '/project/modify',//（put）修改项目
    },
    /**
     * 框架技术控制器
     */
    frameworksCtrl: {
      build: '/framework/build',//（post）添加
      delete: '/framework/delete',//（delete）删除
      list: '/framework/list',//（get）查询信息集合 按照时间顺序倒叙排序
      load: '/framework/load',//（get）查询一个详情信息
      modify: '/framework/modify',//（post）修改
    }
  };
  // 路由链接信息
  static ROUTERLINK: any = {
    store: {
      proInfo: "/store/buildPro/proSteps/proInfo", //填写项目基本信息页面
      proFrames: "/store/buildPro/proSteps/proFrames", //填写项目所选技术框架面
      proRepository: "/store/buildPro/proSteps/proRepository", //填写项目仓库页面
      proSql: "/store/buildPro/proSteps/proSql", //填写项目sql页面
    },
  }
}
