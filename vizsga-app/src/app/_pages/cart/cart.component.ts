import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { CartService } from '@app/_services/cart.service';
import { Clothing } from '@app/_models/clothing';
import { Cart } from '@app/_models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    cart: Cart[];
    countItems: number = 0;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private httpService: CartService
  ) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.loadAllUsers();
    this.getClothesFromService();
    this.countCartItems();
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
        this.loadAllUsers()
    });
  }

  private loadAllUsers() {
      this.userService.getAll().pipe(first()).subscribe(users => {
          this.users = users;
      });
  }
  
  getClothesFromService(): any {
    this.httpService.getClothesFromServer()
      .subscribe(res => this.cart = res);
  }

  removeItem(itemId){
    const id = itemId;
  
    this.httpService.removeCartItemById(id)
      .subscribe(res => {
        console.log('Done!');
      });

    this.getClothesFromService();
    this.countCartItems();
  }

  countCartItems(): any {
    this.httpService.getClothesFromServer()
      .subscribe(res => {
        for(let i=0; i<res.length; i++){ 
            if(res[i].username === this.currentUser.username){    
                this.countItems++;
            }
        }
  });

}

}
