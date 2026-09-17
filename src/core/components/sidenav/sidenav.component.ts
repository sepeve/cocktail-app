import { Component, inject, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Menu, NavigationPath } from '../../../models';
import { NgIcon } from '@ng-icons/core';
import { ZardDrawerImports } from '@/shared/components/drawer/drawer.imports';
import { ZardDarkMode } from '@/shared/services';

@Component({
    selector: "app-sidenav",
    templateUrl: "./sidenav.component.html",
    imports: [RouterLink, RouterLinkActive, NgIcon, ZardDrawerImports]
})

export class SidenavComponent {
    protected readonly darkMode = inject(ZardDarkMode);
    navigationPath = NavigationPath;
    sidenavOpened = input.required<boolean>();
    menu = input<Menu[]>();
    sidenavClose = output<void>();

    toggleTheme(): void {
        this.darkMode.toggleTheme();
    }
}
