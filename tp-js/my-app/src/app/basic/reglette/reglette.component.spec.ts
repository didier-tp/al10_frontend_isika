import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegletteComponent } from './reglette.component';

describe('RegletteComponent', () => {
  let component: RegletteComponent;
  let fixture: ComponentFixture<RegletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegletteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
