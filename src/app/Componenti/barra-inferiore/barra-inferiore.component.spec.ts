import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraInferioreComponent } from './barra-inferiore.component';

describe('BarraInferioreComponent', () => {
  let component: BarraInferioreComponent;
  let fixture: ComponentFixture<BarraInferioreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarraInferioreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarraInferioreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
