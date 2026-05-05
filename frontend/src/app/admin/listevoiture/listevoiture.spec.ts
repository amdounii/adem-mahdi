import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listevoiture } from './listevoiture';

describe('Listevoiture', () => {
  let component: Listevoiture;
  let fixture: ComponentFixture<Listevoiture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listevoiture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listevoiture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
