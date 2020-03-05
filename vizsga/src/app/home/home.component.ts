import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { NewArrivals } from '@app/_models/newArrivals';
import { HomeService } from '@app/_services/home.service';
import * as AOS from 'aos';

@Component({ 
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']     
})
export class HomeComponent implements OnInit {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    cart: string;
    newArrivals: NewArrivals[];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private httpService: HomeService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        AOS.init();
        this.getClothesFromService();
    }

    getClothesFromService(): any {
        this.httpService.getClothesFromServer()
          .subscribe(res => this.newArrivals = res);
    }

}