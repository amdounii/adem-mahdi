import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Detaillevoiture } from './detaillevoiture';

describe('Detaillevoiture', () => {
  let component: Detaillevoiture;
  let fixture: ComponentFixture<Detaillevoiture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Detaillevoiture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Detaillevoiture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
