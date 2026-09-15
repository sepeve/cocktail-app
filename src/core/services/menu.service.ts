import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../../models';

@Injectable({ providedIn: 'root' })
export class MenuService {
    private readonly http: HttpClient = inject(HttpClient);
    getMenu(): Observable<Menu[]> {
        const url = "config/menu.json";
        return this.http.get<Menu[]>(url);
    }
}
