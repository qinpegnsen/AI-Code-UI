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
  public static MENUS: Array<any> = new Array();      //平台菜单
  //定义枚举
  static ENUM: any = {
    articleState: 1005,  //eg文章状态枚举
  };

  constructor() {
    const _this = this;
  }

}
