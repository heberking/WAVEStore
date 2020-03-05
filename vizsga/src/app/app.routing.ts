import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { CartComponent } from './_pages/cart/cart.component';
import { ItemComponent } from './_pages/item/item.component';
import { ShopComponent } from './_pages/shop/shop.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent  },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
    { path: 'item/:id', component: ItemComponent},
    { path: 'shop', component: ShopComponent},
    { path: 'shop/hoodies', component: ShopComponent},
    { path: 'shop/t-shirts', component: ShopComponent},
    { path: 'shop/jackets', component: ShopComponent},
    { path: 'shop/sneakers', component: ShopComponent},


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);