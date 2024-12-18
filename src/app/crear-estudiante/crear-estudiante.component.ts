// Aquí se importan las dependencias de Angular necesarias para el componente
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEstudiante } from "../interfaces/estudiante";
import { EstudianteService } from '../services/post.service';


// Decorador para definir el componente de creación de estudiante
@Component({
  selector: 'app-create-estudiante',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-estudiante.component.html',
  styleUrls: ['./crear-estudiante.component.scss']
})
export class CreateEstudianteComponent implements OnInit {
  estudianteForm!: FormGroup; //aca se define el formulario reactivo, que va a ser inicializado en ngOnInit

   // Constructor donde se inyectan las dependencias necesarias
  constructor(
    private fb: FormBuilder, //fb es una instancia de FormBuilder, que ayuda a construir formularios reactivos
    private estudianteService: EstudianteService  // Servicio para manejar datos de estudiantes
  ) { }

  // Método ngOnInit que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    // Definición y configuración del formulario usando FormBuilder
    this.estudianteForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      registrationDate: ['']
    });
  }


// Método para enviar el formulario y agregar un nuevo estudiante
  addEstudiante() {
    if (this.estudianteForm.valid) {
      const estudianteData: IEstudiante = this.estudianteForm.value;//Capturar los datos del formulario
      this.estudianteService.agregarEstudiante(estudianteData);//Envía los datos al servicio para guardarlos
      this.clearForm();// Limpia el formulario después de enviar
    }
  }
// Método que restablece el formulario a su estado inicial
  clearForm() {
    this.estudianteForm.reset();
  }
}

