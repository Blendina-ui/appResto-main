import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { RestoCategorie } from '../../interfaces';
import { IonItem, IonLabel, IonList } from '@ionic/angular/standalone';



const UIElements = [IonList, IonItem, IonLabel]
@Component({
  selector: 'app-menu-category',
  standalone: true,
  imports: [
    IonList,
    IonLabel,
    IonItem,

  ],
  templateUrl: './menu-category.component.html',
  styleUrl: './menu-category.component.css'
})
export class MenuCategoryComponent {

    @Input() categories!: RestoCategorie[];
    @Output() selectedEvent: EventEmitter<string> = new EventEmitter()
}
