import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppConfigService } from '../../core/services';
import { map, Observable } from 'rxjs';
import { Drink, Letter } from '../../models';

@Injectable()
export class DrinkService {
    http: HttpClient = inject(HttpClient);
    appConfig: AppConfigService = inject(AppConfigService);
    API_URL = `${this.appConfig.apiURL}/${this.appConfig.apiKey}`;

    get(name: string): Observable<Drink[]> {
        const url = `${this.API_URL}/search.php?s=${name}`;
        return this.http.get<{ drinks: Drink[] }>(url).pipe(map(res => res.drinks || []));
    }

    getByLetter(letter: Letter): Observable<Drink[]> {
        const url = `${this.API_URL}/search.php?f=${letter}`;
        return this.http.get<{ drinks: Drink[] }>(url).pipe(map(res => res.drinks || []));
    }

    getById(id: string): Observable<Drink | null> {
        const url = `${this.API_URL}/lookup.php?i=${id}`;
        return this.http.get<{ drinks: Drink[] }>(url).pipe(map(res => res.drinks && res.drinks.length > 0 ? res.drinks[0] : null));
    }
}
