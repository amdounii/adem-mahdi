import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Detailleutilisateur } from './detailleutilisateur';

describe('Detailleutilisateur', () => {
  let component: Detailleutilisateur;
  let fixture: ComponentFixture<Detailleutilisateur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Detailleutilisateur]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Detailleutilisateur);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
