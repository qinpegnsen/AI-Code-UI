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
       '添加一些项目的基本的信息'
      ],
      proFrames:[
        '选择技术框架'
      ],
      proSql:[
        '添加sql信息'
      ],
      proRepository:[
        '添加仓库信息'
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
