import {MainComponent} from '../layout/main/main.component';
import {SimpleComponent} from '../layout/simple/simple.component';
import {PageComponent} from '../layout/page/page.component';

export const routes = [
  {
    path: 'store',
    component: MainComponent,
    children: [
      {path: '', redirectTo: '/store/home', pathMatch: 'full'},
      {path: 'home', loadChildren: './home/home.module#HomeModule'},
    ]
  },
  {
    path: 'main',
    component: SimpleComponent,
    children: [
      {path: '', redirectTo: '/main/project', pathMatch: 'full'},
      {path: 'home', loadChildren: './home/home.module#HomeModule'},
      {path: 'project', loadChildren: './project/project.module#ProjectModule'},
      {path: 'buildPro', loadChildren: './build-project/build-project.module#BuildProjectModule'}
    ]
  },
  {
    path: 'page',
    component: PageComponent,
    children: [
      {path: '', redirectTo: '/page/home', pathMatch: 'full'},
      {path: 'home', loadChildren: './home/home.module#HomeModule'}
    ]
  },
  // 路由指向找不到时，指向这里
  {path: '**', redirectTo: '/main/project'}
];
