import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';
declare var $: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public editorOptions = {
    theme: 'vs-dark',
    language: 'sql',
    scrollBeyondLastLine: false,
    readOnly: true,
  };
  public projectCode: string;
  public projectData: any= {};
  public code: string = `CREATE NONCLUSTERED INDEX IX_WorkOrder_ProductID ON Production.WorkOrder(ProductID)
  WITH (FILLFACTOR = 80,PAD_INDEX = ON,DROP_EXISTING = ON);GO`;

  public data = [
    {
      key    : '1',
      name   : 'John Brown',
      age    : 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key    : '2',
      name   : 'Jim Green',
      age    : 42,
      address: 'London No. 1 Lake Park',
    }, {
      key    : '3',
      name   : 'Joe Black',
      age    : 32,
      address: 'Sidney No. 1 Lake Park',
    }
  ];


  constructor(public project: ProjectService,
              public route: ActivatedRoute,
              public router: Router) { }

  ngOnInit() {
    this.projectCode = this.route.snapshot.queryParams['code'];
    $.when(this.project.getDetail(this.projectCode)).always(data => {
      // this._loading = false;//解除锁屏
      this.projectData = data;
      console.log("█ this.projectData ►►►",  this.projectData);
    });
  }

  goBack() {
    this.router.navigate(['/main/project']);
  }

  /**
   * 跳转页面
   * @param step 跳转到的哪步
   * @param type 新增还是修改
   */
  skipTo(step,type) {
    this.project.routerSkip(step,type,this.projectCode);
  }

}
