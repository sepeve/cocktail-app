import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { Drink } from '@/models';
import { MocktailService } from './mocktail.service';
import { MocktailStore } from './mocktail.store';

describe('MocktailStore', () => {
    let store: InstanceType<typeof MocktailStore>;
    let mocktailService: Pick<MocktailService, 'get'>;
    let titleService: Pick<Title, 'setTitle'>;

    beforeEach(() => {
        mocktailService = { get: vi.fn() };
        titleService = { setTitle: vi.fn() };
        vi.spyOn(console, 'log').mockImplementation(() => undefined);

        TestBed.configureTestingModule({
            providers: [
                MocktailStore,
                { provide: MocktailService, useValue: mocktailService },
                { provide: Title, useValue: titleService },
            ],
        });

        store = TestBed.inject(MocktailStore);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('loads mocktails and updates pagination when the request completes', () => {
        const response = new Subject<Drink[]>();
        const drinks = Array.from({ length: 11 }, (_, index) => ({
            idDrink: String(index),
            strDrink: `Mocktail ${index}`,
        }) as Drink);
        vi.mocked(mocktailService.get).mockReturnValue(response);

        store.get();

        expect(store.loading()).toBe(true);
        expect(titleService.setTitle).toHaveBeenCalledWith('Cocktail App - Mocktails');
        expect(mocktailService.get).toHaveBeenCalledOnce();

        response.next(drinks);
        response.complete();

        expect(store.drinks()).toEqual(drinks);
        expect(store.pageSize()).toBe(10);
        expect(store.totalItems()).toBe(11);
        expect(store.totalPages()).toBe(2);
        expect(store.loading()).toBe(false);
    });

    it('clears mocktails and pagination when the request fails', () => {
        const response = new Subject<Drink[]>();
        vi.mocked(mocktailService.get).mockReturnValue(response);

        store.get();
        response.error('Request failed');

        expect(store.drinks()).toEqual([]);
        expect(store.error()).toBe('Request failed');
        expect(store.totalItems()).toBe(0);
        expect(store.loading()).toBe(false);
        expect(console.log).toHaveBeenCalledWith('Request failed');
    });
});
