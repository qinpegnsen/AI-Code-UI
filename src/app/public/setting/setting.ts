/*基本属性配置*/

export class Setting {
  public static STORE: any = {};                       //企业信息
  public static APP: any = {                           //平台信息
    name: '仁中和AI-Code代码自动化生成框架',
    description: 'AI-Code代码自动生成',
    copyright:'© 2017 - 仁中和AI-Code代码自动生成',
    logo:'../../../assets/img/logo.png',
    logoDark:'../../../assets/img/logo-dark.png',
    defaultImg: '../../../assets/img/dummy.png',
    userDefaultImg: '../../../assets/img/user-default.png'
  };
  public static PAGEMSG: any = {                        //平台信息提示（公式、提示、引导等等...）
    tipTitle: "操作提示",
    message: {
      proInfo: [
       '项目英文名将作为数据库名使用，请遵循命名规范避免失败',
       '版权文字将注释在文件头部',
       '项目基础包名范例：com.rzhkj的格式，结尾不要有“.点”出现',
       '项目描述仅描述生成任务内容，不会参与代码生成任务',
      ],
      proFrames:[
        '技术名称代表技术框架的组合，通常只需要选择一个组合就可以满足需要',
        '多个项目建议分开建立，或者以模块为单位进行建立',
      ],
      proSql:[
        '建议使用工具导出的sql脚本',
        '脚本应该经过测试可以正常创建数据库或者数据库全套表',
        '数据库脚本将默认采用mysql数据库进行连接，并用于代码解析与生成，请注意与mysql的兼容性问题',
      ],
      proRepository:[
        '账户密码是git或者是svn的账户密码，必须具备提交代码的权限',
        '仓库地址为完成的http地址，如：<a href="https://gitee.com/helixin/AI-Code.git" target="_blank">仓库地址</a>',
      ]
    }
  };
  public static MENUS: Array<any> = new Array();      //平台菜单
  //定义枚举
  static ENUM: any = {
    articleState: 1005,  //eg文章状态枚举
  };

  constructor() {
    const _this = this;
  }

}
