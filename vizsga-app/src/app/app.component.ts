import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { AuthenticationService } from './_services';
import { User } from './_models';
import { CartService } from './_services/cart.service';
import { Cart } from './_models/cart';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
    currentUser: User;
    cart: Cart[] = [];
    mobile: boolean = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private _location: Location,
        private cartService: CartService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit(){
        this.getScreenWidth();
    }

    getScreenWidth() {
        if(screen.width < 1000){
            this.mobile = true;
        }
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/']);
    }

    back() {
        this._location.back();
    }

}