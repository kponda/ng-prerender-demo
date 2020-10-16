import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseCmsLibComponent } from './firebase-cms-lib.component';

describe('FirebaseCmsLibComponent', () => {
  let component: FirebaseCmsLibComponent;
  let fixture: ComponentFixture<FirebaseCmsLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirebaseCmsLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseCmsLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
