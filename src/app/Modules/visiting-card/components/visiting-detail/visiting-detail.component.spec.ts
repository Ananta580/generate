import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitingDetailComponent } from './visiting-detail.component';

describe('VisitingDetailComponent', () => {
  let component: VisitingDetailComponent;
  let fixture: ComponentFixture<VisitingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
