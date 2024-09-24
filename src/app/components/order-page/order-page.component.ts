import { Component } from '@angular/core';
import { APIService } from "../../api.service";
import { RestoCategorie } from "../../interfaces";
import { AsyncPipe, NgFor, UpperCasePipe, CommonModule} from "@angular/common";
import { FilterByCategoryIDPipe } from "../../pipes/filterByCategoryID/filter-by-category-id.pipe";
import { FormArray, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';  // Importation de FormsModule
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonInfiniteScroll, IonItem, IonLabel, IonList, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { UpdateComponent } from "../update/update.component";

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [
    NgFor,
    UpperCasePipe,
    FilterByCategoryIDPipe,
    AsyncPipe,
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonGrid,
    IonInfiniteScroll,
    IonCard,
    IonRow,
    IonCol,
    IonCardContent,
    IonAvatar,
    IonFooter,
    IonCardTitle,
    IonCardHeader,
    UpdateComponent
],
  
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent {
  title = 'resto';
  categories!: RestoCategorie[];
  categories$: Promise<RestoCategorie[]> = new APIService().getRecipes();
  selectedCategoryId: string = '01489fc9-0be3-424e-a276-33e393062072';
  

  orderForm = new FormArray([] as any, Validators.compose([
    Validators.minLength(2)
  ]));

  addToForm(id: string, price: number) {
    // check si la recette choisie est deja dans la liste de comande

    const itemExist = this.orderForm.value.findIndex((element: {id: string}) => element.id === id);

    //si oui on increment la quantity
    if(itemExist >= 0) {
      const quantity: number = this.orderForm.at(itemExist).get('quantity')?.value || 1;
      this.orderForm.at(itemExist).get('quantity')?.patchValue(quantity + 1)
    }

    //si non on creer le ctrl et on le met dans la liste de comande
    else{
      const itemCtrl = new FormGroup({
        quantity: new FormControl(1),
        id: new FormControl(id),
        price: new FormControl(price)
      });

      this.orderForm.push(itemCtrl)
    }
    
    console.log(this.orderForm.value, this.orderForm.valid);
  }

 

  deleteToForm(id: string, price: number) {
    const itemExist = this.orderForm.value.findIndex((element: {id: string}) => element.id === id);

    if (itemExist >= 0) {
      let quantity: number = this.orderForm.at(itemExist).get('quantity')?.value || 1;
      quantity--;
      if (quantity <= 0) {
        this.orderForm.removeAt(itemExist);
      } else {
        this.orderForm.at(itemExist).get('quantity')?.patchValue(quantity);
      }
    }

    console.log(this.orderForm.value, this.orderForm.valid);
  }

  
}
