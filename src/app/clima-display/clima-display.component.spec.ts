import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimaDisplayComponent } from './clima-display.component';

describe('ClimaDisplayComponent', () => {
  let component: ClimaDisplayComponent;
  let fixture: ComponentFixture<ClimaDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClimaDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClimaDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
