import { Component, inject, Signal } from '@angular/core';
import { CoreStore } from '../@store/core.store';
import { LoaderComponent } from "../components";
import { SidenavComponent } from "../components/sidenav/sidenav.component";
import { RouterOutlet } from '@angular/router';
import { Menu } from '../../models';

@Component({
    selector: "app-default-layout",
    templateUrl: "./default-layout.component.html",
    imports: [LoaderComponent, RouterOutlet, SidenavComponent],
})

export class DefaultLayoutComponent {
    coreStore = inject(CoreStore);
    isLoading: Signal<boolean> = this.coreStore.isLoading;
    menu: Signal<Menu[]> = this.coreStore.menu;

}
