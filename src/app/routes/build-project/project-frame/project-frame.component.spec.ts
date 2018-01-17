import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFrameComponent } from './project-frame.component';

describe('ProjectFrameComponent', () => {
  let component: ProjectFrameComponent;
  let fixture: ComponentFixture<ProjectFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
