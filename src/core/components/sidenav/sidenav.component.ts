import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Menu, NavigationPath } from '../../../models';
import { NgIcon } from '@ng-icons/core';

@Component({
    selector: "app-sidenav",
    templateUrl: "./sidenav.component.html",
    imports: [RouterLink, RouterLinkActive, NgIcon]
})

export class SidenavComponent {
    navigationPath = NavigationPath;
    sidenavOpened = input<boolean>();
    menu = input<Menu[]>();
    sidenavClose = output<void>();
}
