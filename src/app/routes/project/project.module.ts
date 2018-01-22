import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DetailComponent } from './detail/detail.component';
import { ProjectService } from './project.service';
import {SpliceStrPipe} from "../../public/pipes/splice-str.pipe";

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'detail', component: DetailComponent}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [ProjectService],
  declarations: [
    ListComponent,
    DetailComponent,
    SpliceStrPipe
]
})
export class ProjectModule { }
