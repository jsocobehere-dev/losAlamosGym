import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'; 
import { Servicio1 } from '../servicio-1';
import { Plan } from '../plan';
import { Subscription } from 'rxjs';
// 🌟 Agregamos Validators para las validaciones del formulario reactivo
import { FormGroup, FormControl, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-asesorias-list',
  standalone: false,
  templateUrl: './asesorias-list.html',
  styleUrl: './asesorias-list.scss',
})
export class AsesoriasListComponent implements OnInit, OnDestroy {
  listaPlanes: Plan[] = [];
  elementosDelServicio: string[] = []; 
  
  // 🌟 REQUERIMIENTO OPCIONAL: Agregamos validaciones (Validators.required)
  planForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]), // Obligatorio
    descripcion: new FormControl('', [Validators.required, Validators.minLength(5)]), // Obligatorio y mínimo 5 caracteres
    precio: new FormControl('', [Validators.required, Validators.min(1)]) // Obligatorio y mayor a 0
  });
  
  private todasLasSuscripciones: Subscription[] = [];

  constructor(
    private servicio1: Servicio1,
    private cdr: ChangeDetectorRef 
  ) { }

  ngOnInit(): void {
    console.log('1. Iniciando ngOnInit, llamando a la API...');

    const subPlanes = this.servicio1.obtenerPlanesApi().subscribe({
      next: (planesDesdeServer) => {
        this.listaPlanes = planesDesdeServer;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('❌ Error al traer los planes:', err);
      }
    });
    this.todasLasSuscripciones.push(subPlanes);

    const subElementos = this.servicio1.listaElementos$.subscribe(datos => {
      this.elementosDelServicio = datos;
    });
    this.todasLasSuscripciones.push(subElementos);
  }

  guardarNuevoPlan(): void {
    // Si el formulario es inválido, no hace nada y frena la ejecución
    if (this.planForm.invalid) {
      this.planForm.markAllAsTouched(); // Marca los campos para que salte el cartel rojo en pantalla
      return;
    }

    const nuevoPlanForm = this.planForm.value;

    const nuevoPlan: Plan = {
      id: this.listaPlanes.length + 1,
      nombre: nuevoPlanForm.nombre || '',
      descripcion: nuevoPlanForm.descripcion || '',
      precio: Number(nuevoPlanForm.precio) || 0,
      profesor: 'Profesor Asignado', 
      img: 'img/musculacion.jpeg',  
      stock: 5,                     
      cantidad: 0,
      enOferta: false
    };

    // 🌟 REQUERIMIENTO OPCIONAL: Mandamos los datos usando el flujo del método POST de la API
    const subPost = this.servicio1.crearPlanApi(nuevoPlan).subscribe({
      next: (planGuardado) => {
        console.log('✅ ¡Plan guardado exitosamente vía POST!:', planGuardado);
        this.listaPlanes.push(planGuardado); // Lo agrega a la tabla visualmente
        this.cdr.detectChanges();
        this.planForm.reset(); // Limpia el formulario
      }
    });
    this.todasLasSuscripciones.push(subPost);
  }

  ngOnDestroy(): void {
    this.todasLasSuscripciones.forEach(sub => sub.unsubscribe());  
  }
}