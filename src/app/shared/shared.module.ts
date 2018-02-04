import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ImgErrDirective} from "../public/directives/img-err.directive";
import {StateNamePipe} from "../public/pipes/state-name.pipe";
import {PathPipe} from "../public/pipes/path.pipe";
import {MonacoEditorModule} from "ngx-monaco-editor";

@NgModule({
  imports: [
    CommonModule,                 //核心模块，必须
    FormsModule,                  //表单支持
    ReactiveFormsModule,          //表单支持
    NgZorroAntdModule.forRoot(),  //zorroUI库
    MonacoEditorModule.forRoot()  //代码编辑模块
  ],
  declarations: [
    StateNamePipe,          //将状态值转为对应状态名得管道
    ImgErrDirective,         //图片加载失败时，加载默认图片
    PathPipe              //路径截取的管道
  ],
  providers: [],
  exports: [
    CommonModule,           //核心模块，必须
    RouterModule,           //路由依赖模块
    FormsModule,            //表单支持
    ReactiveFormsModule,    //表单支持
    NgZorroAntdModule,      //zorroUI库
    StateNamePipe,          //将状态值转为对应状态名得管道
    ImgErrDirective,         //图片加载失败时，加载默认图片
    MonacoEditorModule,  //代码编辑模块
    PathPipe           //路径截取的管道
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
