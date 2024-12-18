import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EstudianteService } from '../services/post.service'; 
import { IEstudiante } from '../interfaces/estudiante'; 
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-update-estudiante',
  standalone: true, 
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss'] 
})
export class UpdateEstudianteComponent implements OnInit {
  estudianteForm!: FormGroup; // el Formulario reactivo para actualizar los datos del estudiante

  // Constructor con inyección de dependencias
  constructor(
    private route: ActivatedRoute, // ActivatedRoute para obtener parámetros de la URL
    public router: Router, // Router para redireccionar a otras rutas
    private fb: FormBuilder, // FormBuilder para crear el formulario de manera reactiva
    private estudianteService: EstudianteService // Servicio para manejar los datos de estudiantes
  ) {}

  // Método ngOnInit, aue se ejecuta al inicializar el componente
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el parámetro 'id' de la URL y lo convierte a número
    // Configuración del formulario con validaciones
    this.estudianteForm = this.fb.group({
      name: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]], 
      registrationDate: [''] 
    });

    // Cargar los datos del estudiante en el formulario usando el servicio
    this.estudianteService.obtenerEstudiantePorId(id).subscribe(estudiante => {
      if (estudiante) {
        // patchValue carga los datos en el formulario sin sobrescribir toda su estructura
        this.estudianteForm.patchValue(estudiante);
      } else {
        // Si no se encuentra el estudiante, muestra una alerta y redirige al listado de estudiantes
        alert('Estudiante no encontrado');
        this.router.navigate(['/listar-estudiantes']);
      }
    });
  }

  // Método para guardar los cambios realizados en el formulario
  guardarCambios() {
    // Verifica que el formulario sea válido antes de proceder
    if (this.estudianteForm.valid) {
      // Crea un objeto IEstudiante usando los datos del formulario y el ID de la URL
      const estudianteActualizado: IEstudiante = { 
        ...this.estudianteForm.value,
        id: Number(this.route.snapshot.paramMap.get('id')) // Incluye el ID del estudiante
      };
      // Llama al servicio para actualizar el estudiante
      this.estudianteService.actualizarEstudiante(estudianteActualizado);
      // Redirige al usuario al listado de estudiantes después de actualizar
      this.router.navigate(['/listar-estudiantes']);
    }
  }
}
