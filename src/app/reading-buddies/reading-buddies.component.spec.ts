import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReadingBuddiesComponent } from './reading-buddies.component';

describe('ReadingBuddiesComponent', () => {
  let component: ReadingBuddiesComponent;
  let fixture: ComponentFixture<ReadingBuddiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingBuddiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingBuddiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
