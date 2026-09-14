import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class Consultorio {

    private http = inject(HttpClient);
    private url = 'http://localhost:8080/api';


    //Citas
    obtenerCitas() {
        return this.http.get<any[]>(`${this.url}/citas`);
    }

    registrarCita(cita: any) {
        return this.http.post<any>(`${this.url}/citas`, cita);
    }


    //Tratamientos
    obtenerTratamientos() {
        return this.http.get<any[]>(`${this.url}/tratamientos`);
    }

    registrarTratamiento(tratamiento: any) {
        return this.http.post<any>(
            `${this.url}/tratamientos`,
            tratamiento
        );
    }


    //Pagos
    obtenerPagos() {
        return this.http.get<any[]>(`${this.url}/pagos`);
    }

    registrarPago(pago: any) {
        return this.http.post<any>(
            `${this.url}/pagos`,
            pago
        );
    }

}
