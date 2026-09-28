import { Component, input, output, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Drink, NavigationPath } from '@/models';
import { LatestService } from './latest.service';
import { LatestStore } from './latest.store';
import { LatestComponent } from './latest.component';

@Component({ selector: 'app-cocktail-carousel', standalone: true, template: '' })
class CocktailCarouselStubComponent {
    cocktails = input.required<Drink[]>();
    cocktailClicked = output<Drink>();
}

@Component({ selector: 'app-cocktail-skeleton', standalone: true, template: '' })
class CocktailSkeletonStubComponent { }

describe('LatestComponent', () => {
    let fixture: ComponentFixture<LatestComponent>;
    let loading: ReturnType<typeof signal<boolean>>;
    let router: { navigateByUrl: ReturnType<typeof vi.fn> };

    beforeEach(() => {
        const drink = { idDrink: '11007', strDrink: 'Margarita' } as Drink;
        loading = signal(true);
        router = { navigateByUrl: vi.fn() };
        const latestStore = { drinks: signal<Drink[]>([drink]), loading, get: vi.fn() };

        TestBed.configureTestingModule({ imports: [LatestComponent] }).overrideComponent(LatestComponent, {
            set: {
                imports: [CocktailCarouselStubComponent, CocktailSkeletonStubComponent],
                providers: [
                    { provide: LatestStore, useValue: latestStore },
                    { provide: LatestService, useValue: {} },
                    { provide: Router, useValue: router },
                ],
            },
        });

        fixture = TestBed.createComponent(LatestComponent);
        fixture.detectChanges();
        expect(latestStore.get).toHaveBeenCalledOnce();
    });

    it('shows loading state, then displays drinks and navigates to their detail route', () => {
        expect(fixture.debugElement.query(By.directive(CocktailSkeletonStubComponent))).not.toBeNull();
        expect(fixture.debugElement.query(By.directive(CocktailCarouselStubComponent))).toBeNull();

        loading.set(false);
        fixture.detectChanges();

        const carousel = fixture.debugElement.query(By.directive(CocktailCarouselStubComponent))
            .componentInstance as CocktailCarouselStubComponent;
        expect(carousel.cocktails()[0].strDrink).toBe('Margarita');
        carousel.cocktailClicked.emit(carousel.cocktails()[0]);

        expect(router.navigateByUrl).toHaveBeenCalledWith(
            `${NavigationPath.Drink}/11007/${NavigationPath.Latest}`,
        );
    });
});
