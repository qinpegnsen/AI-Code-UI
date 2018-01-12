import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  //代码Code编辑器示例所需配置及初始内容
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * 测试代码编辑器
   */
  demo(){
    console.log("code---",this.code);
  }

}
