import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbitudiniComponent } from './abitudini.component';

describe('AbitudiniComponent', () => {
  let component: AbitudiniComponent;
  let fixture: ComponentFixture<AbitudiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbitudiniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbitudiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
