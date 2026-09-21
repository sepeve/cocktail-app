import { Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Menu, NavigationPath } from '../../../models';
import { NgIcon } from '@ng-icons/core';
import { ZardDarkMode } from '@/shared/services';
import { ZardSidebarImports } from '@/shared/components/sidebar';

@Component({
    selector: "app-sidenav",
    templateUrl: "./sidenav.component.html",
    imports: [RouterLink, RouterLinkActive, NgIcon, ZardSidebarImports]
})

export class SidenavComponent {
    protected readonly darkMode = inject(ZardDarkMode);
    navigationPath = NavigationPath;
    menu = input<Menu[]>();

}
