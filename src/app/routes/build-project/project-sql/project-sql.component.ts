import { Component, OnInit } from '@angular/core';
import {ProjectStepsComponent} from "../project-steps/project-steps.component";

@Component({
  selector: 'app-project-sql',
  templateUrl: './project-sql.component.html',
  styleUrls: ['./project-sql.component.css']
})
export class ProjectSqlComponent implements OnInit {

  constructor(public steps:ProjectStepsComponent) {
    this.steps.current = 3;//添加项目的进度条
  }

  ngOnInit() {
  }

}
