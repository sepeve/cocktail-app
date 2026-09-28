import { Component, input, output, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Drink, NavigationPath } from '../../../models';
import { DrinkService } from '../drink.service';
import { DrinkStore } from '../drink.store';
import { DrinkDetailComponent } from './drink-detail.component';

@Component({ selector: 'app-cocktail-detail', standalone: true, template: '' })
class CocktailDetailStubComponent {
    cocktail = input.required<Drink>();
    backClicked = output<void>();
}

@Component({ selector: 'app-cocktail-skeleton', standalone: true, template: '' })
class CocktailSkeletonStubComponent { }

describe('DrinkDetailComponent', () => {
    let fixture: ComponentFixture<DrinkDetailComponent>;
    let component: DrinkDetailComponent;
    let store: {
        drink: ReturnType<typeof signal<Drink | null>>;
        getById: ReturnType<typeof vi.fn>;
    };
    let router: { navigateByUrl: ReturnType<typeof vi.fn> };
    let routeParams: BehaviorSubject<ReturnType<typeof convertToParamMap>>;
    let routeSnapshot: { paramMap: ReturnType<typeof convertToParamMap> };

    beforeEach(() => {
        store = {
            drink: signal<Drink | null>(null),
            getById: vi.fn(),
        };
        router = { navigateByUrl: vi.fn() };
        routeParams = new BehaviorSubject(convertToParamMap({ id: '11007' }));
        routeSnapshot = { paramMap: convertToParamMap({ path: 'latest' }) };

        TestBed.configureTestingModule({
            imports: [DrinkDetailComponent],
        }).overrideComponent(DrinkDetailComponent, {
            set: {
                imports: [CocktailDetailStubComponent, CocktailSkeletonStubComponent],
                providers: [
                    { provide: DrinkStore, useValue: store },
                    { provide: DrinkService, useValue: {} },
                    { provide: Router, useValue: router },
                    {
                        provide: ActivatedRoute,
                        useValue: {
                            paramMap: routeParams.asObservable(),
                            snapshot: routeSnapshot,
                        },
                    },
                ],
            },
        });

        fixture = TestBed.createComponent(DrinkDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('loads drinks when a route ID is present and ignores missing IDs', () => {
        expect(store.getById).toHaveBeenCalledWith('11007');

        routeParams.next(convertToParamMap({ id: '11008' }));
        routeParams.next(convertToParamMap({}));

        expect(store.getById).toHaveBeenCalledTimes(2);
        expect(store.getById).toHaveBeenLastCalledWith('11008');
    });

    it('shows the skeleton until a drink is available and forwards the back path', () => {
        expect(fixture.debugElement.query(By.directive(CocktailSkeletonStubComponent))).not.toBeNull();
        expect(fixture.debugElement.query(By.directive(CocktailDetailStubComponent))).toBeNull();

        const drink = { idDrink: '11007', strDrink: 'Margarita' } as Drink;
        store.drink.set(drink);
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.directive(CocktailSkeletonStubComponent))).toBeNull();
        const detail = fixture.debugElement.query(By.directive(CocktailDetailStubComponent))
            .componentInstance as CocktailDetailStubComponent;
        expect(detail.cocktail()).toEqual(drink);

        detail.backClicked.emit();

        expect(router.navigateByUrl).toHaveBeenCalledWith('latest');
    });

    it('navigates back to the drinks list when the route has no back path', () => {
        routeSnapshot.paramMap = convertToParamMap({});

        component.onBackClicked();

        expect(router.navigateByUrl).toHaveBeenCalledWith(NavigationPath.Drink);
    });

    it('stops reacting to route changes after destruction', () => {
        fixture.destroy();
        routeParams.next(convertToParamMap({ id: '11008' }));

        expect(store.getById).toHaveBeenCalledOnce();
    });
});
