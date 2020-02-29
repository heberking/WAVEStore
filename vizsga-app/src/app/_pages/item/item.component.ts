import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Clothing } from '@app/_models/clothing';
import { ActivatedRoute } from '@angular/router';
import { ClothingService } from '@app/_services/clothing.service';
import { Location } from '@angular/common';
import { ItemService } from '@app/_services/item.service';
import { Cart } from '@app/_models/cart';
import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  
  clothes: Clothing;
  show: boolean = false;
  cart: Cart[];

  constructor(
    private route: ActivatedRoute,
    private clothingService: ClothingService,
    private location: Location,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private httpService: ItemService
  ) { 
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.getIdFromRoute();
  }

  getIdFromRoute(): any {
    const id = +this.route.snapshot.paramMap.get('id');
    this.clothingService.getClothingById(id)
      .subscribe(res => this.clothes = res);
  }

  sendData() {
    this.cart = JSON.parse('{"id": 0 ,"username": "' + this.currentUser.username + '", "itemId": ' + this.clothes.id + ',"itemName": "' + this.clothes.name + '" , "color": "' + this.clothes.color + '", "price": "' + this.clothes.price + '", "img": "' + this.clothes.img + '"}')
    
    this.httpService.addToCart(this.cart)
      .subscribe();
  }

}
