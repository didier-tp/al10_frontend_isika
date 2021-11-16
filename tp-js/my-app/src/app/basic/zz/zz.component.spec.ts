import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ZzComponent } from './zz.component';

describe('ZzComponent', () => {
  let component: ZzComponent;
  let fixture: ComponentFixture<ZzComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ZzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
