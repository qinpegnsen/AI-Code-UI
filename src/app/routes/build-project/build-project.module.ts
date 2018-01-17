import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectStepsComponent } from './project-steps/project-steps.component';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { ProjectFrameComponent } from './project-frame/project-frame.component';
import { ProjectRepositoryComponent } from './project-repository/project-repository.component';
import { ProjectSqlComponent } from './project-sql/project-sql.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

const routes: Routes = [
  {path: '', redirectTo: 'proInfo'},//一般不会出现，路由只有"/basic"时重定向到注册
  {path: 'proInfo', component: ProjectInfoComponent},
  {path: 'proFrames', component: ProjectFrameComponent},
  {path: 'proRepository', component: ProjectRepositoryComponent},
  {path: 'proSql', component: ProjectSqlComponent},
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ProjectStepsComponent, ProjectInfoComponent, ProjectFrameComponent, ProjectRepositoryComponent, ProjectSqlComponent]
})
export class BuildProjectModule { }
