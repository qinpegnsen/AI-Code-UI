import { Component, OnInit } from '@angular/core';
import {ProjectStepsComponent} from "../project-steps/project-steps.component";

@Component({
  selector: 'app-project-repository',
  templateUrl: './project-repository.component.html',
  styleUrls: ['./project-repository.component.css']
})
export class ProjectRepositoryComponent implements OnInit {

  constructor(public steps:ProjectStepsComponent) {
    this.steps.current = 2;//添加项目的进度条
  }

  ngOnInit() {
  }

}
