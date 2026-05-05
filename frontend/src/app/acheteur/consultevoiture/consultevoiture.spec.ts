import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Consultevoiture } from './consultevoiture';

describe('Consultevoiture', () => {
  let component: Consultevoiture;
  let fixture: ComponentFixture<Consultevoiture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Consultevoiture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Consultevoiture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
