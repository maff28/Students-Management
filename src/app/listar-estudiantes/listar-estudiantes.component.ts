// src/app/components/listar-estudiantes/listar-estudiantes.component.ts
import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../services/post.service';
import { IEstudiante } from '../interfaces/estudiante';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Decorador que define las configuraciones básicas del componente
@Component({
  selector: 'app-listar-estudiantes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar-estudiantes.component.html',
  styleUrls: ['./listar-estudiantes.component.scss']
})
export class ListarEstudiantesComponent implements OnInit {
  estudiantes$: Observable<IEstudiante[]>; // Definición de estudiantes$ como un Observable que contiene un array de IEstudiante

  // se realiza la inyección de dependencias
  constructor(private estudianteService: EstudianteService) {
    this.estudiantes$ = this.estudianteService.estudiantes$; // se asigna el observable directamente desde el servicio al componente
  }

  ngOnInit(): void {
    this.estudianteService.cargarEstudiantes(); // se llama al método de carga de estudiantes en el servicio para obtener la lista inicial
  }

  // Método para confirmar antes de eliminar un estudiante
  confirmarEliminacion(id: number): void {
    const confirmacion = confirm("¿Seguro que deseas eliminar este estudiante?");
    if (confirmacion) {
      this.eliminarEstudiante(id); //Llama al método `eliminarEstudiante` si la confirmación es afirmativa
    }
  }

  // Método privado para eliminar un estudiante por su ID
  private eliminarEstudiante(id: number): void {
    this.estudianteService.eliminarEstudiante(id); // Llama al método en el servicio para eliminar el estudiante
  }
}
