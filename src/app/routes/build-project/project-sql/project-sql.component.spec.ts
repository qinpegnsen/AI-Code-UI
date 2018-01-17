import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSqlComponent } from './project-sql.component';

describe('ProjectSqlComponent', () => {
  let component: ProjectSqlComponent;
  let fixture: ComponentFixture<ProjectSqlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSqlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
