import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingBuddiesComponent } from './reading-buddies.component';

describe('ReadingBuddiesComponent', () => {
  let component: ReadingBuddiesComponent;
  let fixture: ComponentFixture<ReadingBuddiesComponent>;

  beforeEach(async(() => {
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
