import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRepositoryComponent } from './project-repository.component';

describe('ProjectRepositoryComponent', () => {
  let component: ProjectRepositoryComponent;
  let fixture: ComponentFixture<ProjectRepositoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectRepositoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
