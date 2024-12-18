import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEstudiantesComponent } from './listar-estudiantes.component';

describe('ListarEstudiantesComponent', () => {
  let component: ListarEstudiantesComponent;
  let fixture: ComponentFixture<ListarEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEstudiantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
