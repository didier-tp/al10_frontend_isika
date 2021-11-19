import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminDeviseComponent } from './admin-devise.component';

describe('AdminDeviseComponent', () => {
  let component: AdminDeviseComponent;
  let fixture: ComponentFixture<AdminDeviseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDeviseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeviseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
