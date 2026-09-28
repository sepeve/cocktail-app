import { AppConfigService } from '@/core/services';
import { Drink } from '@/models';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class MocktailService {
    private readonly http: HttpClient = inject(HttpClient);
    private readonly appConfig: AppConfigService = inject(AppConfigService);
    private readonly baseUrl: string = `${this.appConfig.apiURL}/${this.appConfig.apiKey}`;

    get(): Observable<Drink[]> {
        const url = `${this.baseUrl}/filter.php?a=Non_Alcoholic`;
        return this.http.get<{ drinks: Drink[] }>(url).pipe(map(res => res.drinks || []));
    }

}
