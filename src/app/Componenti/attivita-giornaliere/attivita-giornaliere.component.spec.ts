import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttivitaGiornaliereComponent } from './attivita-giornaliere.component';

describe('AttivitaGiornaliereComponent', () => {
  let component: AttivitaGiornaliereComponent;
  let fixture: ComponentFixture<AttivitaGiornaliereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttivitaGiornaliereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttivitaGiornaliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
