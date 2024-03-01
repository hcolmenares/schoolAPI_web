import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private goToRouteSubject = new BehaviorSubject<string>('/auth');
  goToRoute$ = this.goToRouteSubject.asObservable();

  constructor(private router: Router) {}

  RouterLink(url: string) {
    this.router.navigateByUrl(url);
  }

  setGoToRoute(route: string): void {
    this.goToRouteSubject.next(route);
    this.RouterLink('/splash');
  }

  sentDataObject(data: any) {
    const numeroDePropiedades = Object.keys(data).length;
    if (numeroDePropiedades > 3) {
      const dataStr:string = JSON.stringify(data);
      localStorage.setItem('microorganism', dataStr);
      this.RouterLink('/main/info-micro');
    } else {
      const dataStr:string = JSON.stringify(data);
      localStorage.setItem('gene', dataStr);
      this.RouterLink('/main/info-micro');
    }
  }
}
