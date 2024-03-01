import { Injectable } from '@angular/core';
import { result } from '../interfaces/result';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UtilsService } from './utils.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiAuth = environment.apiAuth;
  private apiRegister = environment.apiRegister;
  private apiForgot = environment.apiForgotPassword;
  private apiRecovery = environment.apiRecoveryPassword;

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService,
    private message: MessageService,
    private jwtHelper: JwtHelperService
  ) {}

  login(email: string, password: string): Observable<result> {
    const credentials = { email, password };

    return this.http.post<result>(this.apiAuth, credentials).pipe(
      tap((res: result) => {
        if (res.result) {
          const token = res.token;
          if (token) {
            const decodedToken = this.jwtHelper.decodeToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', decodedToken.Role);
          }
        } else {
          this.message.error(
            'Hubo un problema.' + res.errors,
            'person-circle-outline'
          );
        }
      })
    );
  }

  register(name: string, password: string): Observable<result> {
    const email = name;
    const newUser = { name, email, password };
    return this.http.post<result>(this.apiRegister, newUser).pipe(
      tap((res: result) => {
        if (res.result) {
          this.message.successful(
            'Usuario creado con exito.',
            'person-circle-outline'
          );
        } else {
          this.message.error(
            'Hubo un problema.' + res.errors,
            'person-circle-outline'
          );
        }
      })
    );
  }

  forgotPassword(email: string): Observable<result> {
    const body = { email: email };
    return this.http.post<result>(this.apiForgot, body).pipe(
      tap((res: result) => {
        if (res.result) {
          const userRecovery = { email: email, token: res.token };
          const userRecoveryString = JSON.stringify(userRecovery);
          localStorage.setItem('userData', userRecoveryString);
        } else {
          this.message.error(
            'Hubo un problema.' + res.errors,
            'person-circle-outline'
          );
        }
      })
    );
  }

  recoveryPassword(
    email: string,
    password: string,
    token: string
  ): Observable<result> {
    const body = { email: email, password: password, token: token };
    return this.http.post<result>(this.apiRecovery, body).pipe(
      tap((res: result) => {
        if (res.result) {
          localStorage.removeItem('userData');
        } else {
          this.message.error(
            'Hubo un problema.' + res.errors,
            'person-circle-outline'
          );
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.utilsService.setGoToRoute('/auth');
  }
}
