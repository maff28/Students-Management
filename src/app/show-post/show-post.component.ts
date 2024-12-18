import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudianteService } from '../services/post.service';
import { IEstudiante } from '../interfaces/estudiante'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-post', 
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './show-post.component.html', 
  styleUrls: ['./show-post.component.scss']
})
export class ShowPostComponent implements OnInit {
  estudiante: IEstudiante | undefined; // la Propiedad para almacenar los datos del estudiante

  // Inyección de dependencias necesarias en el constructor
  constructor(
    private route: ActivatedRoute, // ActivatedRoute para acceder a los parámetros de la URL
    private estudianteService: EstudianteService // Servicio que proporciona los datos del estudiante
  ) {}

  // Método  que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    // Obtiene el parámetro 'id' de la ruta actual
    const id = this.route.snapshot.paramMap.get('id');
    
    // Si el ID está en la ruta, se hace una llamada al servicio para obtener el estudiante
    if (id) {
      this.estudianteService.obtenerEstudiantePorId(+id).subscribe(est => {
        // Asigna los datos del estudiante a la propiedad `estudiante`
        this.estudiante = est;
      });
    }
  }
}
