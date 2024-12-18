import { HttpClient } from '@angular/common/http'; 
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IEstudiante } from '../interfaces/estudiante';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

// Decorador que marca el servicio como inyectable y lo registra en la raíz de la aplicación
@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private apiUrl = "http://127.0.0.1:8000/estudiantes"; // URL base de la API de FastAPI para estudiantes
  private estudiantesSubject = new BehaviorSubject<IEstudiante[]>([]); // BehaviorSubject que contiene la lista de estudiantes y permite actualizaciones en tiempo real

  // Constructor que inyecta HttpClient y carga los estudiantes al inicializar el servicio
  constructor(private http: HttpClient) {
    this.cargarEstudiantes(); // Carga inicial de estudiantes desde la API
  }

  // Método que carga la lista de estudiantes desde la API y actualiza el BehaviorSubject
  public cargarEstudiantes(): void {
    this.http.get<IEstudiante[]>(this.apiUrl).pipe(
      tap(estudiantes => this.estudiantesSubject.next(estudiantes)), // Actualiza estudiantesSubject con los datos obtenidos
      catchError(error => {
        console.error("Error al cargar estudiantes:", error);
        return of([]); // En caso de error, devuelve un observable con una lista vacía
      })
    ).subscribe(); // La suscripción permite que el Observable se ejecute
  }

  // Getter para obtener el observable de estudiantes, permitiendo a otros componentes suscribirse a los datos
  get estudiantes$(): Observable<IEstudiante[]> {
    return this.estudiantesSubject.asObservable();
  }

  // Método para agregar un nuevo estudiante mediante una solicitud POST a la API
  public agregarEstudiante(nuevoEstudiante: IEstudiante): void {
    this.http.post<IEstudiante>(this.apiUrl, nuevoEstudiante).pipe(
      tap(() => this.cargarEstudiantes()), // Recarga la lista de estudiantes después de agregar uno nuevo
      catchError(error => {
        console.error("Error al agregar estudiante:", error);
        return of(undefined); // En caso de error, devuelve un observable de undefined
      })
    ).subscribe();
  }

  // Método para obtener un estudiante específico por ID mediante una solicitud GET
  public obtenerEstudiantePorId(id: number): Observable<IEstudiante | undefined> {
    return this.http.get<IEstudiante>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error al obtener el estudiante con id ${id}:`, error);
        return of(undefined); // En caso de error, devuelve un observable de undefined
      })
    );
  }

  // Método para actualizar un estudiante existente mediante una solicitud PUT
  public actualizarEstudiante(estudianteActualizado: IEstudiante): void {
    this.http.put<IEstudiante>(`${this.apiUrl}/${estudianteActualizado.id}`, estudianteActualizado).pipe(
      tap(() => this.cargarEstudiantes()), // Recarga la lista de estudiantes después de actualizar
      catchError(error => {
        console.error("Error al actualizar estudiante:", error);
        return of(undefined); // En caso de error, devuelve un observable de undefined
      })
    ).subscribe();
  }

  // Método para eliminar un estudiante mediante una solicitud DELETE a la API
  public eliminarEstudiante(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.cargarEstudiantes()), // Recarga la lista de estudiantes después de eliminar
      catchError(error => {
        console.error("Error al eliminar estudiante:", error);
        return of(undefined); // En caso de error, devuelve un observable de undefined
      })
    ).subscribe();
  }
}




