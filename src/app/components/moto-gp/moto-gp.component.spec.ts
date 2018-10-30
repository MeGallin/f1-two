import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoGpComponent } from './moto-gp.component';

describe('MotoGpComponent', () => {
  let component: MotoGpComponent;
  let fixture: ComponentFixture<MotoGpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotoGpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotoGpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
