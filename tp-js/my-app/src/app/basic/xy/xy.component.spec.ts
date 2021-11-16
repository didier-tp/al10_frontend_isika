import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { XyComponent } from './xy.component';

describe('XyComponent', () => {
  let component: XyComponent;
  let fixture: ComponentFixture<XyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
