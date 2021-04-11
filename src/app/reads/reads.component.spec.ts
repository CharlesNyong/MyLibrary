import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReadsComponent } from './reads.component';

describe('ReadsComponent', () => {
  let component: ReadsComponent;
  let fixture: ComponentFixture<ReadsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
