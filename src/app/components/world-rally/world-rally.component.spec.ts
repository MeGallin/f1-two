import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldRallyComponent } from './world-rally.component';

describe('WorldRallyComponent', () => {
  let component: WorldRallyComponent;
  let fixture: ComponentFixture<WorldRallyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldRallyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldRallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
