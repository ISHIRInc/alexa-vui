import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticate: boolean = false;
  constructor(private http: HttpClient) { }

  validateToken(token: string): Observable<any> {
    const params = new HttpParams()
      .set('token', token);

      // return this.http.post('http://localhost:8000/token/validate', { params });
    return this.http.post('https://vy4s4h8oh5.execute-api.us-east-2.amazonaws.com/dev/token/validate', null, { params });
  }

  setAuthenticated(authenticate: boolean) {
    this.isAuthenticate = authenticate;
  }
  
  isAuthenticated(): boolean {
    return this.isAuthenticate;
  }
}
