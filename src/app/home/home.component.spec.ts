import { Component, input, output, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Menu } from '../../models';
import { CoreStore } from '../../core/@store/core.store';
import { HomeComponent } from './home.component';

@Component({ selector: 'app-menu-card', standalone: true, template: '' })
class MenuCardStubComponent {
    menuItem = input.required<Menu>();
    menuItemClicked = output<string>();
}

describe('HomeComponent', () => {
    let fixture: ComponentFixture<HomeComponent>;
    let router: { navigateByUrl: ReturnType<typeof vi.fn> };

    beforeEach(() => {
        const menu = [
            { label: 'Drinks', description: 'Browse drinks', path: '/drink', icon: 'glass' },
            { label: 'Latest', description: 'Recent drinks', path: '/latest', icon: 'latest' },
        ];
        router = { navigateByUrl: vi.fn() };

        TestBed.configureTestingModule({ imports: [HomeComponent] }).overrideComponent(HomeComponent, {
            set: {
                imports: [MenuCardStubComponent],
                providers: [
                    { provide: CoreStore, useValue: { menu: signal<Menu[]>(menu) } },
                    { provide: Router, useValue: router },
                ],
            },
        });

        fixture = TestBed.createComponent(HomeComponent);
        fixture.detectChanges();
    });

    it('renders menu cards from the core store and navigates on selection', () => {
        const cards = fixture.debugElement.queryAll(By.directive(MenuCardStubComponent));
        expect(cards).toHaveLength(2);
        expect((cards[0].componentInstance as MenuCardStubComponent).menuItem().path).toBe('/drink');

        (cards[1].componentInstance as MenuCardStubComponent).menuItemClicked.emit('/latest');

        expect(router.navigateByUrl).toHaveBeenCalledWith('/latest');
    });
});
