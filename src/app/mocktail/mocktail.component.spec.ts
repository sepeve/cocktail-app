import { Component, input, output, NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Drink, NavigationPath } from '@/models';
import { MocktailService } from './mocktail.service';
import { MocktailStore } from './mocktail.store';
import { MockatailComponent } from './mocktail.component';

@Component({ selector: 'app-cocktail-list', standalone: true, template: '' })
class CocktailListStubComponent {
    cocktails = input.required<Drink[]>();
    cocktailClicked = output<Drink>();
}

describe('MockatailComponent', () => {
    let fixture: ComponentFixture<MockatailComponent>;
    let mocktailStore: {
        drinks: ReturnType<typeof signal<Drink[]>>;
        loading: ReturnType<typeof signal<boolean>>;
        pageIndex: ReturnType<typeof signal<number>>;
        pageSize: ReturnType<typeof signal<number>>;
        totalPages: ReturnType<typeof signal<number>>;
        hasNextPage: ReturnType<typeof signal<boolean>>;
        hasPrevPage: ReturnType<typeof signal<boolean>>;
        get: ReturnType<typeof vi.fn>;
        nextPage: ReturnType<typeof vi.fn>;
        setPage: ReturnType<typeof vi.fn>;
    };
    let router: { navigateByUrl: ReturnType<typeof vi.fn> };

    beforeEach(() => {
        mocktailStore = {
            drinks: signal<Drink[]>(Array.from({ length: 11 }, (_, index) => ({
                idDrink: String(index),
                strDrink: `Mocktail ${index}`,
            }) as Drink)),
            loading: signal(false),
            pageIndex: signal(0),
            pageSize: signal(10),
            totalPages: signal(2),
            hasNextPage: signal(true),
            hasPrevPage: signal(false),
            get: vi.fn(),
            nextPage: vi.fn(),
            setPage: vi.fn(),
        };
        router = { navigateByUrl: vi.fn() };

        TestBed.configureTestingModule({ imports: [MockatailComponent] }).overrideComponent(MockatailComponent, {
            set: {
                imports: [CocktailListStubComponent],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: MocktailStore, useValue: mocktailStore },
                    { provide: MocktailService, useValue: {} },
                    { provide: Router, useValue: router },
                ],
            },
        });

        fixture = TestBed.createComponent(MockatailComponent);
        fixture.detectChanges();
    });

    it('loads mocktails and binds the current page', () => {
        expect(mocktailStore.get).toHaveBeenCalledOnce();
        expect(fixture.componentInstance.pages()).toEqual([1, 2]);

        const list = fixture.debugElement.query(By.directive(CocktailListStubComponent))
            .componentInstance as CocktailListStubComponent;
        expect(list.cocktails()).toHaveLength(10);

        mocktailStore.pageIndex.set(1);
        fixture.detectChanges();

        expect(list.cocktails()).toHaveLength(1);
        expect(list.cocktails()[0].idDrink).toBe('10');
    });

    it('navigates to the drink route when a mocktail is selected', () => {
        const list = fixture.debugElement.query(By.directive(CocktailListStubComponent))
            .componentInstance as CocktailListStubComponent;

        list.cocktailClicked.emit({ idDrink: '11007', strDrink: 'Virgin Margarita' } as Drink);

        expect(router.navigateByUrl).toHaveBeenCalledWith(
            `${NavigationPath.Drink}/11007/${NavigationPath.Latest}`,
        );
    });
});
