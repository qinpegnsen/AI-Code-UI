import { Component, OnInit } from '@angular/core';
import {ProjectStepsComponent} from "../project-steps/project-steps.component";

@Component({
  selector: 'app-project-frame',
  templateUrl: './project-frame.component.html',
  styleUrls: ['./project-frame.component.css']
})
export class ProjectFrameComponent implements OnInit {

  constructor(public steps:ProjectStepsComponent) {
    this.steps.current = 1;//添加项目的进度条
  }

  ngOnInit() {
  }

}
