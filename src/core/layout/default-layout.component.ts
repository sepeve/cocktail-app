import { Component, inject, Signal } from '@angular/core';
import { CoreStore } from '../@store/core.store';
import { LoaderComponent } from "../components";
import { SidenavComponent } from "../components/sidenav/sidenav.component";
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { Menu } from '../../models';

@Component({
    selector: "app-default-layout",
    templateUrl: "./default-layout.component.html",
    styleUrl: "./dafault-layout.component.css",
    imports: [LoaderComponent, RouterOutlet, SidenavComponent, NgClass],
})

export class DefaultLayoutComponent {
    coreStore = inject(CoreStore);
    isSidenavHidden: Signal<boolean> = this.coreStore.isSidenavHidden;
    isLoading: Signal<boolean> = this.coreStore.isLoading;
    menu: Signal<Menu[]> = this.coreStore.menu;

    onSidenavOpenChange(isOpen: boolean): void {
        const sidenavWidth = !isOpen ? '20rem' : '0px';
        document.documentElement.style.setProperty('--sidenav-width', sidenavWidth);
        this.coreStore.setSidenavOpen(isOpen);
    }
}
