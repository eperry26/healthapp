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

    getMeds(): Observable<Medication> //fetch the meds from the json server to display continuously
    {
        return this.httpClient.get<Medication>(this.endPoint)
    }

    getMed(id: number): Observable<Medication> { // fetch a med if we want more info (possible future implementation)
        return this.httpClient.get<Medication>(this.endPoint + '/' + id)
    }

    createMed(med: Medication): Observable<Medication> { // adding a med to the list
        return this.httpClient.post<Medication>(this.endPoint, JSON.stringify(med), this.httpHeader)
    }

    updateMed(id: number, data: Medication): Observable<Medication> { // update details of a med such as name, dose, etc..
        return this.httpClient.put<Medication>(this.endPoint + '/' + id, JSON.stringify(data), this.httpHeader)
    }

    deleteMed(id: number) { // remove med from json server
        return this.httpClient.delete<Medication>(this.endPoint + '/' + id, this.httpHeader)
    }


}
