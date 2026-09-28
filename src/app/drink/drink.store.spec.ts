import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { throwError, of, Subject } from 'rxjs';
import { Drink, Letter } from '../../models';
import { DrinkService } from './drink.service';
import { DrinkStore } from './drink.store';

describe('DrinkStore', () => {
    let store: InstanceType<typeof DrinkStore>;
    let drinkService: Pick<DrinkService, 'get' | 'getByLetter' | 'getById'>;
    let titleService: Pick<Title, 'setTitle'>;

    beforeEach(() => {
        drinkService = {
            get: vi.fn(),
            getByLetter: vi.fn(),
            getById: vi.fn(),
        };
        titleService = { setTitle: vi.fn() };
        vi.spyOn(console, 'log').mockImplementation(() => undefined);

        TestBed.configureTestingModule({
            providers: [
                DrinkStore,
                { provide: DrinkService, useValue: drinkService },
                { provide: Title, useValue: titleService },
            ],
        });

        store = TestBed.inject(DrinkStore);
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('starts with empty drink state and the configured page size', () => {
        expect(store.drinks()).toEqual([]);
        expect(store.drink()).toBeNull();
        expect(store.loading()).toBe(false);
        expect(store.error()).toBeNull();
        expect(store.pageSize()).toBe(25);
    });

    it('loads drinks by name and updates pagination when the request completes', () => {
        const response = new Subject<Drink[]>();
        const drinks = Array.from({ length: 26 }, (_, index) => ({
            idDrink: String(index),
            strDrink: `Drink ${index}`,
        }) as Drink);
        vi.mocked(drinkService.get).mockReturnValue(response);

        store.get('margarita');

        expect(drinkService.get).toHaveBeenCalledWith('margarita');
        expect(titleService.setTitle).toHaveBeenCalledWith('Cocktail App - Drinks');
        expect(store.loading()).toBe(true);

        response.next(drinks);
        response.complete();

        expect(store.drinks()).toEqual(drinks);
        expect(store.totalItems()).toBe(26);
        expect(store.totalPages()).toBe(2);
        expect(store.loading()).toBe(false);
    });

    it('loads drinks by letter', () => {
        const drinks = [{ idDrink: '11007', strDrink: 'Margarita' } as Drink];
        vi.mocked(drinkService.getByLetter).mockReturnValue(of(drinks));

        store.getByLetter(Letter.A);

        expect(drinkService.getByLetter).toHaveBeenCalledWith(Letter.A);
        expect(store.drinks()).toEqual(drinks);
        expect(store.totalItems()).toBe(1);
        expect(store.loading()).toBe(false);
    });

    it('loads a drink by ID after the configured delay', async () => {
        const drink = { idDrink: '11007', strDrink: 'Margarita' } as Drink;
        vi.useFakeTimers();
        vi.mocked(drinkService.getById).mockReturnValue(of(drink));

        store.getById('11007');

        expect(drinkService.getById).toHaveBeenCalledWith('11007');
        expect(store.loading()).toBe(true);
        expect(titleService.setTitle).toHaveBeenCalledWith('Loading Drink...');

        await vi.advanceTimersByTimeAsync(1000);

        expect(store.drink()).toEqual(drink);
        expect(store.loading()).toBe(false);
        expect(titleService.setTitle).toHaveBeenLastCalledWith('Margarita');
    });

    it('clears drinks and records an error when a name search fails', () => {
        vi.mocked(drinkService.get).mockReturnValue(throwError(() => 'Request failed'));

        store.get('margarita');

        expect(store.drinks()).toEqual([]);
        expect(store.error()).toBe('Request failed');
        expect(store.totalItems()).toBe(0);
        expect(store.loading()).toBe(false);
    });
});
