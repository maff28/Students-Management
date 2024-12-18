import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateEstudianteComponent } from './crear-estudiante/crear-estudiante.component';
import { ListarEstudiantesComponent } from './listar-estudiantes/listar-estudiantes.component';
import { UpdateEstudianteComponent } from './update-post/update-post.component';
import { ShowPostComponent } from './show-post/show-post.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgIf } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import { IEstudiante } from './interfaces/estudiante';

@Component({
  selector: 'app-root',
  providers: [HttpClient],
  standalone: true,
  imports: [
    RouterOutlet,
    CreateEstudianteComponent,
    ListarEstudiantesComponent,
    UpdateEstudianteComponent,
    ShowPostComponent,
    NavbarComponent,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
