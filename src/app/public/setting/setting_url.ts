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
     * 项目任务管理控制器
     */
    projectJobCtrl: {
      build: '/project/job/build',//（post）创建任务
      execute: '/project/job/execute',//（get）执行任务
      delete: '/project/job/delete',//（delete）删除任务
      list: '/project/job/list',//（get）查询任务列表
      load: '/project/job/load',//（get）load当前任务
      modify: '/project/job/modify',//（put）修改任务

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
    },
    /**
     * 项目框架技术关联控制器
     */
    projectFramworkCtrl: {
      add: '/project/framwork/add',//（post）添加项目技术
      delete: '/project/framwork/delete',//（delete）删除
      list: '/project/framwork/list',//（get）查询信息集合 按照时间顺序倒叙排序
      load: '/project/framwork/load',//（get）查询一个详情信息
    },
    /**
     * 代码仓库账户管理控制器
     */
    projectRepositoryAccountCtrl: {
      build: '/project/repository/build',//（post）创建账户
      delete: '/project/repository/delete',//（delete）删除
      list: '/project/repository/list',//（get）查询信息集合 按照时间顺序倒叙排序
      load: '/project/repository/load',//（get）查询一个详情信息
      modify: '/project/repository/modify',//（put）修改
    },
    /**
     * 项目sql管理控制器
     */
    projectSqlCtrl: {
      build: '/project/sql/build',//（post）创建项目sql
      delete: '/project/sql/delete',//（delete）删除项目sql
      list: '/project/sql/list',//（get）查询sql信息集合 按照时间顺序倒叙排序
      load: '/project/sql/load',//（get）查询一个sql详情信息
      modify: '/project/sql/modify',//（put）修改sql
    },
  };
  // 路由链接信息
  static ROUTERLINK: any = {
    buildPro: {
      proInfo: "/main/buildPro/proSteps/proInfo", //填写项目基本信息页面
      proFrames: "/main/buildPro/proSteps/proFrames", //填写项目所选技术框架面
      proRepository: "/main/buildPro/proSteps/proRepository", //填写项目仓库页面
      proSql: "/main/buildPro/proSteps/proSql", //填写项目sql页面
    },
    project:{
      list:"/main/project",//项目的列表
      detail:"/main/project/detail",//项目的详情
    }
  }
}
