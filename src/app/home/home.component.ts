import { Component, inject, Signal } from '@angular/core';
import { CoreStore } from '../../core/@store/core.store';
import { Menu } from '../../models';
import { MenuCardComponent } from '../../core/components';
import { Router } from '@angular/router';

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    imports: [MenuCardComponent]
})
export class HomeComponent {
    coreStore = inject(CoreStore);
    router: Router = inject(Router);
    menu: Signal<Menu[]> = this.coreStore.menu;

    onMenuItemClicked(path: string): void {
        this.router.navigateByUrl(path);
    }
}
