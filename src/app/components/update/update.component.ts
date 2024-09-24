import { AsyncPipe, NgIf } from '@angular/common';
import { Component, isDevMode, OnInit, ViewEncapsulation } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ToastOptions } from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular/standalone';
import { filter, map, merge, Observable, of, Subject } from 'rxjs';

@Component({
  standalone:true,
  selector: 'app-update',
  template: `
        <div *ngIf="updateAvailable$|async"> </div>
    `,
    styles: [``],
    encapsulation: ViewEncapsulation.None,
  imports:[NgIf, AsyncPipe]
})
export class UpdateComponent {

  updateAvailable$: Observable<boolean | {}>;
    closed$ = new Subject<void>();

    constructor(
        private readonly _updates: SwUpdate,
        private readonly _toast: ToastController
    ) {
        console.log('Application updater install: ', isDevMode);
        this.updateAvailable$ = merge(
          of(false),
          this._updates.versionUpdates.pipe(
            filter((e) => e.type === 'VERSION_DETECTED'),
            map(async () => await this._displayNotif()),
            map(() => true)
          ),
          this.closed$.pipe(map(() => false))
        );
    }

    async activateUpdate() {
      if (!isDevMode) {
          return
      }
      await this._updates.activateUpdate()
      location.reload();
  }

  private async _displayNotif() {
      console.log('display notification...');
      const data = <ToastOptions>{
        message: 'Nouvelle mise à jours!',
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: `Update`,
        buttons: ['ok']
        
      };
      const toast = await this._toast.create(data);
      await toast.present();
      await toast.onDidDismiss()
      this.activateUpdate();
    }

}
