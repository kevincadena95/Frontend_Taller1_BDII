import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { Consultorio } from '../services/consultorio';

@Component({
  selector: 'app-administracion',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './administracion.html',
  styleUrl: './administracion.css'
})
export class Administracion implements OnInit {

  private consultorioService = inject(Consultorio);
  private fb = inject(FormBuilder);

  citas = signal<any[]>([]);
  tratamientos = signal<any[]>([]);
  pagos = signal<any[]>([]);

  mensaje = signal('');
  error = signal('');


  //Formualrio Cita
  formularioCita = this.fb.group({

    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    idPaciente: [null, Validators.required],
    idOdontologo: [null, Validators.required]
  });

  //Formulario Tratamiento
  formularioTratamiento = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: [''],
    precio: [null, Validators.required],
    fecha: ['', Validators.required],
    observacion: [''],
    idPaciente: [null, Validators.required],
    idOdontologo: [null, Validators.required]
  });

  //formulario Pago
  formularioPago = this.fb.group({
    monto: [null, Validators.required],
    metodoPago: ['EFECTIVO', Validators.required],
    idTratamiento: [null, Validators.required]
  });

  ngOnInit(): void {
    this.obtenerCitas();
    this.obtenerTratamientos();
    this.obtenerPagos();
  }

  // CITAS

  obtenerCitas() {
    this.consultorioService.obtenerCitas()
      .subscribe({
        next: (datos) => {
          this.citas.set(datos);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  registrarCita() {
    if (this.formularioCita.invalid) {
      return;
    }

    this.consultorioService
      .registrarCita(this.formularioCita.value)
      .subscribe({
        next: (respuesta) => {
          this.mensaje.set(respuesta.mensaje);
          this.error.set('');
          this.formularioCita.reset();
          this.obtenerCitas();
        },

        error: (err) => {
          this.error.set(
            err.error?.error || 'Error al registrar la cita'
          );

          this.mensaje.set('');
        }
      });
  }

  //TRATAMIENTOS

  obtenerTratamientos() {

    this.consultorioService.obtenerTratamientos()
      .subscribe({
        next: (datos) => {
          this.tratamientos.set(datos);
        },

        error: (err) => {
          console.log(err);
        }
      });
  }


  registrarTratamiento() {
    if (this.formularioTratamiento.invalid) {
      return;
    }

    this.consultorioService
      .registrarTratamiento(
        this.formularioTratamiento.value
      )
      .subscribe({

        next: (respuesta) => {
          this.mensaje.set(respuesta.mensaje);
          this.error.set('');
          this.formularioTratamiento.reset();
          this.obtenerTratamientos();
        },

        error: (err) => {

          this.error.set(
            err.error?.error ||
            'Error al registrar el tratamiento'
          );

          this.mensaje.set('');
        }
      });
  }

  //PAGOS

  obtenerPagos() {

    this.consultorioService.obtenerPagos()
      .subscribe({
        next: (datos) => {
          this.pagos.set(datos);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  registrarPago() {

    if (this.formularioPago.invalid) {
      return;
    }

    this.consultorioService
      .registrarPago(this.formularioPago.value)
      .subscribe({
        next: (respuesta) => {
          this.mensaje.set(respuesta.mensaje);
          this.error.set('');
          this.formularioPago.reset({
            metodoPago: 'EFECTIVO'
          });

          this.obtenerPagos();
          this.obtenerTratamientos();
        },

        error: (err) => {
          this.error.set(
            err.error?.error ||
            'Error al registrar el pago'
          );
          this.mensaje.set('');
        }
      });
  }
}