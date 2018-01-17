import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-steps',
  templateUrl: './project-steps.component.html',
  styleUrls: ['./project-steps.component.css']
})
export class ProjectStepsComponent implements OnInit {

  current:number = 0;   //进度条默认的进度
  constructor() { }

  ngOnInit() {
  }

}
