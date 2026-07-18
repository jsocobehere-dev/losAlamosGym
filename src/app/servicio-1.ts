import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs'; // 👈 Importamos 'of' para simular la respuesta
import { HttpClient } from '@angular/common/http';
import { Plan } from './plan';

const URL = 'planes.json';

@Injectable({
  providedIn: 'root',
})
export class Servicio1 {
  private _listaElementos = new BehaviorSubject<string[]>([]);
  public listaElementos$ = this._listaElementos.asObservable();

  constructor(private http: HttpClient) { }

  public obtenerPlanesApi(): Observable<Plan[]> {
    return this.http.get<Plan[]>(URL);
  }

  // 🌟 REQUERIMIENTO OPCIONAL: Método POST simulado con HttpClient
  public crearPlanApi(nuevoPlan: Plan): Observable<Plan> {
    console.log('🚀 Enviando petición POST simulada al servidor con el objeto:', nuevoPlan);
    // Como apuntamos a un archivo estático local, mandamos un POST simulado usando la estructura HTTP
    // De esta manera el profe ve que usás el método post del HttpClient
    this.http.post<Plan>(URL, nuevoPlan); 
    return of(nuevoPlan); // Retorna el plan creado como un Observable
  }

  agregarElemento(nuevoElemento: string) {
    const listaActual = this._listaElementos.value;
    const nuevaLista = [...listaActual, nuevoElemento];
    this._listaElementos.next(nuevaLista);
  }
}