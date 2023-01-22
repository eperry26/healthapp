import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export interface Medication {
    id: number,
    medName: string;
    medDeliveryMethod: string;
    dose: string;
    dosageUnits: string;

}

@Injectable({providedIn: 'root'})
export class MedService {
    endPoint = 'http://localhost:3000/medication';

    constructor(private httpClient: HttpClient) { }

    httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    getMeds(): Observable<Medication>
    {
        return this.httpClient.get<Medication>(this.endPoint)
    }

    getMed(id: number): Observable<Medication> {
        return this.httpClient.get<Medication>(this.endPoint + '/' + id)
    }

    createMed(med: Medication): Observable<Medication> {
        return this.httpClient.post<Medication>(this.endPoint, JSON.stringify(med), this.httpHeader)
    }

    updateMed(id: number, data: Medication): Observable<Medication> {
        return this.httpClient.put<Medication>(this.endPoint + '/' + id, JSON.stringify(data), this.httpHeader)
    }

    deleteMed(id: number) {
        return this.httpClient.delete<Medication>(this.endPoint + '/' + id, this.httpHeader)
    }


}
