import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CoreStore } from '../core/@store/core.store';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    it('loads the menu when the root component initializes', () => {
        const coreStore = { loadMenu: vi.fn() };
        TestBed.configureTestingModule({ imports: [AppComponent] }).overrideComponent(AppComponent, {
            set: {
                imports: [],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [{ provide: CoreStore, useValue: coreStore }],
            },
        });

        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();

        expect(coreStore.loadMenu).toHaveBeenCalledOnce();
    });
});
