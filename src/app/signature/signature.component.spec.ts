import { Component, input, output, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Drink, NavigationPath } from '@/models';
import { SignatureService } from './signature.service';
import { SignatureStore } from './signature.store';
import { SignatureComponent } from './signature.component';

@Component({ selector: 'app-cocktail-carousel', standalone: true, template: '' })
class CocktailCarouselStubComponent {
    cocktails = input.required<Drink[]>();
    cocktailClicked = output<Drink>();
}

@Component({ selector: 'app-cocktail-skeleton', standalone: true, template: '' })
class CocktailSkeletonStubComponent { }

describe('SignatureComponent', () => {
    let fixture: ComponentFixture<SignatureComponent>;
    let loading: ReturnType<typeof signal<boolean>>;
    let router: { navigateByUrl: ReturnType<typeof vi.fn> };

    beforeEach(() => {
        const drink = { idDrink: '11007', strDrink: 'Margarita' } as Drink;
        loading = signal(false);
        router = { navigateByUrl: vi.fn() };
        const signatureStore = { drinks: signal<Drink[]>([drink]), loading, get: vi.fn() };

        TestBed.configureTestingModule({ imports: [SignatureComponent] }).overrideComponent(SignatureComponent, {
            set: {
                imports: [CocktailCarouselStubComponent, CocktailSkeletonStubComponent],
                providers: [
                    { provide: SignatureStore, useValue: signatureStore },
                    { provide: SignatureService, useValue: {} },
                    { provide: Router, useValue: router },
                ],
            },
        });

        fixture = TestBed.createComponent(SignatureComponent);
        fixture.detectChanges();
        expect(signatureStore.get).toHaveBeenCalledOnce();
    });

    it('shows the carousel when loaded and navigates to the signature detail route', () => {
        const carousel = fixture.debugElement.query(By.directive(CocktailCarouselStubComponent))
            .componentInstance as CocktailCarouselStubComponent;
        expect(fixture.debugElement.query(By.directive(CocktailSkeletonStubComponent))).toBeNull();

        carousel.cocktailClicked.emit(carousel.cocktails()[0]);

        expect(router.navigateByUrl).toHaveBeenCalledWith(
            `${NavigationPath.Drink}/11007/${NavigationPath.Signature}`,
        );
    });
});
