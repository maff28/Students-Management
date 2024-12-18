// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LayoutComponent } from "./layout/layout.component";
import { ListarEstudiantesComponent } from "./listar-estudiantes/listar-estudiantes.component";
import { CreateEstudianteComponent } from "./crear-estudiante/crear-estudiante.component";
import { UpdateEstudianteComponent } from "./update-post/update-post.component";
import { ShowPostComponent } from "./show-post/show-post.component";

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent, // Layout principal para todas las rutas
        children: [
            { path: 'listar-estudiantes', component: ListarEstudiantesComponent },              // Lista de posts
            { path: 'create', component: CreateEstudianteComponent },     // Crear un nuevo post
            { path: 'editar/:id', component: UpdateEstudianteComponent },   // Editar post con `id`
            { path: 'show/:id', component: ShowPostComponent }           // Mostrar detalles de post con `id`
        ]
    },
    // Redirección por defecto y ruta comodín
    { path: '', redirectTo: 'listar-estudiantes', pathMatch: 'full' }
];
