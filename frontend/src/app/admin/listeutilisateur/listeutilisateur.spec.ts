import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listeutilisateur } from './listeutilisateur';

describe('Listeutilisateur', () => {
  let component: Listeutilisateur;
  let fixture: ComponentFixture<Listeutilisateur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listeutilisateur]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listeutilisateur);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
