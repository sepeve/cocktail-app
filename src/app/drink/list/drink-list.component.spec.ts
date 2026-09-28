import { Component, input, NO_ERRORS_SCHEMA, output, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Drink, Letter, NavigationPath } from '../../../models';
import { DrinkService } from '../drink.service';
import { DrinkStore } from '../drink.store';
import { DrinkListComponent } from './drink-list.component';

@Component({ selector: 'app-letter-filter', standalone: true, template: '' })
class LetterFilterStubComponent {
    letterClicked = output<Letter>();
}

@Component({ selector: 'app-searcher', standalone: true, template: '' })
class SearcherStubComponent {
    placeholder = input.required<string>();
    reset = input<Subject<void>>();
    searchEvent = output<string>();
}

@Component({ selector: 'app-cocktail-list', standalone: true, template: '' })
class CocktailListStubComponent {
    cocktails = input.required<Drink[]>();
    cocktailClicked = output<Drink>();
}

describe('DrinkListComponent', () => {
    let fixture: ComponentFixture<DrinkListComponent>;
    let component: DrinkListComponent;
    let store: {
        drinks: ReturnType<typeof signal<Drink[]>>;
        loading: ReturnType<typeof signal<boolean>>;
        pageIndex: ReturnType<typeof signal<number>>;
        pageSize: ReturnType<typeof signal<number>>;
        totalPages: ReturnType<typeof signal<number>>;
        hasNextPage: ReturnType<typeof signal<boolean>>;
        hasPrevPage: ReturnType<typeof signal<boolean>>;
        get: ReturnType<typeof vi.fn>;
        getByLetter: ReturnType<typeof vi.fn>;
        nextPage: ReturnType<typeof vi.fn>;
        setPage: ReturnType<typeof vi.fn>;
    };
    let router: { navigate: ReturnType<typeof vi.fn> };

    beforeEach(() => {
        store = {
            drinks: signal<Drink[]>(Array.from({ length: 26 }, (_, index) => ({
                idDrink: String(index),
                strDrink: `Drink ${index}`,
            }) as Drink)),
            loading: signal(false),
            pageIndex: signal(0),
            pageSize: signal(25),
            totalPages: signal(2),
            hasNextPage: signal(true),
            hasPrevPage: signal(false),
            get: vi.fn(),
            getByLetter: vi.fn(),
            nextPage: vi.fn(),
            setPage: vi.fn(),
        };
        router = { navigate: vi.fn() };

        TestBed.configureTestingModule({
            imports: [DrinkListComponent],
            schemas: [NO_ERRORS_SCHEMA],
        }).overrideComponent(DrinkListComponent, {
            set: {
                imports: [LetterFilterStubComponent, SearcherStubComponent, CocktailListStubComponent],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: DrinkStore, useValue: store },
                    { provide: DrinkService, useValue: {} },
                    { provide: Router, useValue: router },
                ],
            },
        });

        fixture = TestBed.createComponent(DrinkListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('loads the default letter and binds the visible page of drinks', () => {
        expect(store.getByLetter).toHaveBeenCalledWith(Letter.A);
        expect(component.pages()).toEqual([1, 2]);

        const list = fixture.debugElement.query(By.directive(CocktailListStubComponent))
            .componentInstance as CocktailListStubComponent;
        expect(list.cocktails()).toHaveLength(25);

        store.pageIndex.set(1);
        fixture.detectChanges();

        expect(list.cocktails()).toHaveLength(1);
        expect(list.cocktails()[0].idDrink).toBe('25');
    });

    it('forwards search and letter events to the store and resets search on letter changes', () => {
        const searcher = fixture.debugElement.query(By.directive(SearcherStubComponent))
            .componentInstance as SearcherStubComponent;
        const letterFilter = fixture.debugElement.query(By.directive(LetterFilterStubComponent))
            .componentInstance as LetterFilterStubComponent;
        const reset = vi.fn();
        component.letterChanged.subscribe(reset);

        expect(searcher.placeholder()).toBe('Search for a drink...');
        expect(searcher.reset()).toBe(component.letterChanged);

        searcher.searchEvent.emit('margarita');
        expect(store.get).toHaveBeenCalledWith('margarita');

        letterFilter.letterClicked.emit(Letter.M);
        expect(store.getByLetter).toHaveBeenLastCalledWith(Letter.M);
        expect(reset).toHaveBeenCalledOnce();
    });

    it('navigates to the selected drink detail', () => {
        const list = fixture.debugElement.query(By.directive(CocktailListStubComponent))
            .componentInstance as CocktailListStubComponent;
        const drink = { idDrink: '11007', strDrink: 'Margarita' } as Drink;

        list.cocktailClicked.emit(drink);

        expect(router.navigate).toHaveBeenCalledWith([NavigationPath.Drink, '11007']);
    });
});
