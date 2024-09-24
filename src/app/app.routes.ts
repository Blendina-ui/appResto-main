import { Routes } from '@angular/router';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { KitchenPageComponent } from './components/kitchen-page/kitchen-page.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'home',
        pathMatch:'full'
    },
    {
        path:'home',
        component: OrderPageComponent
    },
    {
        path:'admin',
        component: KitchenPageComponent

    }

];
