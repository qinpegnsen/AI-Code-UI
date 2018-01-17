import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'detail', component: DetailComponent}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ListComponent,
    DetailComponent
]
})
export class ProjectModule { }
