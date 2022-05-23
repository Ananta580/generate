import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitingPresetComponent } from './visiting-preset.component';

describe('VisitingPresetComponent', () => {
  let component: VisitingPresetComponent;
  let fixture: ComponentFixture<VisitingPresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitingPresetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitingPresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
