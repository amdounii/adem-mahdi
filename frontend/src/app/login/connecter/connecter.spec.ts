import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Connecter } from './connecter';

describe('Connecter', () => {
  let component: Connecter;
  let fixture: ComponentFixture<Connecter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Connecter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Connecter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
