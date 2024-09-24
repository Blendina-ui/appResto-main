import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { APIService } from './api.service';
import { RestoCategorie } from './interfaces';
import {OrderPageComponent} from './components/order-page/order-page.component';
import { NgFor, NgStyle, SlicePipe, UpperCasePipe } from '@angular/common';
import '@khmyznikov/pwa-install';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UpdateComponent } from './components/update/update.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, OrderPageComponent, NgStyle, NgFor, SlicePipe, UpperCasePipe, UpdateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppComponent implements OnInit {
  title = 'appResto';
  categories!: RestoCategorie[];

  async ngOnInit(): Promise<void> {
    const value = await new APIService().getRecipes();
    console.log(value);
    this.categories = value;
  }
}
