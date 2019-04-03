import { Injectable } from '@angular/core';
// import { Response, URLSearchParams, Headers } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpCallService {
  constructor(private client: HttpClient) {}

  deleteRequest(url: string, headersData: {}) {
    const headers = new HttpHeaders();
    for (const key in headersData) {
      if (headersData.hasOwnProperty(key)) {
        const val = headersData[key];
        headers.set(key, val);
      }
    }
    const options = {
      headers: headers
    };
    return this.client.delete(url, options).pipe(
      catchError(err => {
        console.log('Error DELETE request', err);
        return throwError(err);
      })
    );
  }

  putRequest(url: string, data: any, headersData: {}) {
    const headers = new HttpHeaders();
    for (const key in headersData) {
      if (headersData.hasOwnProperty(key)) {
        const val = headersData[key];
        headers.set(key, val);
      }
    }
    const options = {
      headers: headers
    };
    return this.client.put(url, data, options).pipe(
      catchError(err => {
        console.log('Error PUT request', err);
        return throwError(err);
      })
    );
  }

  postRequest(url: string, data: any, headersData: {}) {
    const headers = new HttpHeaders();
    for (const key in headersData) {
      if (headersData.hasOwnProperty(key)) {
        const val = headersData[key];
        headers.set(key, val);
      }
    }
    const options = {
      headers: headers
    };
    return this.client.post(url, data, options).pipe(
      catchError(err => {
        console.log('Error POST request', err);
        return throwError(err);
      })
    );
  }

  // Standard get request
  getRequest(url: string, param: any) {
    let params: HttpParams = new HttpParams();
    for (const key in param) {
      if (param.hasOwnProperty(key)) {
        const val = param[key];
        params = params.append(key, val);
      }
    }
    return this.client.get(url, { params }).pipe(
      catchError(err => {
        console.log('Error GET request', err);
        return throwError(err);
      })
    );
  }
}
