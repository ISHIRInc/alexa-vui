import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillAndManipulationComponent } from './skill-and-manipulation.component';

describe('SkillAndManipulationComponent', () => {
  let component: SkillAndManipulationComponent;
  let fixture: ComponentFixture<SkillAndManipulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillAndManipulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillAndManipulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
