import { Component, OnInit } from '@angular/core';
import {ProjectStepsComponent} from "../project-steps/project-steps.component";
import {Setting} from "../../../public/setting/setting";

@Component({
  selector: 'app-project-sql',
  templateUrl: './project-sql.component.html',
  styleUrls: ['./project-sql.component.css']
})
export class ProjectSqlComponent implements OnInit {

  //代码Code编辑器示例所需配置及初始内容
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';
  guideLang: any = Setting.PAGEMSG;                  //引导语

  constructor(public steps:ProjectStepsComponent) {
    this.steps.current = 1;//添加项目的进度条
  }

  ngOnInit() {
  }

}
