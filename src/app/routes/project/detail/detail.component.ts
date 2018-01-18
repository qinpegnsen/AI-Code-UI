import { Component, OnInit } from '@angular/core';

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


  constructor() { }

  ngOnInit() {
  }

}
