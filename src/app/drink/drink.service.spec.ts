import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { AppConfigService } from '../../core/services';
import { Drink, Letter } from '../../models';
import { DrinkService } from './drink.service';

describe('DrinkService', () => {
    let service: DrinkService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DrinkService,
                { provide: AppConfigService, useValue: { apiURL: 'https://api.example.test/v1', apiKey: 'test-key' } },
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
        });

        service = TestBed.inject(DrinkService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('searches by name and returns the matching drinks', async () => {
        const drinks = [{ idDrink: '11007', strDrink: 'Margarita' } as Drink];
        const result = firstValueFrom(service.get('margarita'));

        const request = httpTestingController.expectOne(
            'https://api.example.test/v1/test-key/search.php?s=margarita',
        );
        expect(request.request.method).toBe('GET');
        request.flush({ drinks });

        await expect(result).resolves.toEqual(drinks);
    });

    it('returns an empty array when a name search has no drinks', async () => {
        const result = firstValueFrom(service.get('unknown'));

        httpTestingController
            .expectOne('https://api.example.test/v1/test-key/search.php?s=unknown')
            .flush({ drinks: null });

        await expect(result).resolves.toEqual([]);
    });

    it('searches by letter', async () => {
        const result = firstValueFrom(service.getByLetter(Letter.A));

        const request = httpTestingController.expectOne(
            'https://api.example.test/v1/test-key/search.php?f=a',
        );
        expect(request.request.method).toBe('GET');
        request.flush({ drinks: [] });

        await expect(result).resolves.toEqual([]);
    });

    it('returns the first drink found by ID', async () => {
        const drinks = [
            { idDrink: '11007', strDrink: 'Margarita' } as Drink,
            { idDrink: '11008', strDrink: 'Another drink' } as Drink,
        ];
        const result = firstValueFrom(service.getById('11007'));

        const request = httpTestingController.expectOne(
            'https://api.example.test/v1/test-key/lookup.php?i=11007',
        );
        expect(request.request.method).toBe('GET');
        request.flush({ drinks });

        await expect(result).resolves.toEqual(drinks[0]);
    });

    it('returns null when an ID lookup has no drinks', async () => {
        const result = firstValueFrom(service.getById('missing'));

        httpTestingController
            .expectOne('https://api.example.test/v1/test-key/lookup.php?i=missing')
            .flush({ drinks: [] });

        await expect(result).resolves.toBeNull();
    });
});
