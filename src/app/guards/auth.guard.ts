import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, pipe} from 'rxjs';
import {AlertController} from "@ionic/angular";
import {AuthService, Role} from "../services/auth.service";
import {map, take} from "rxjs/operators";
import {FireDataService} from "../services/fire-data.service";
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private alertController: AlertController
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.afAuth.authState.pipe(
      map(user => {
        if (user && user.uid) {
          // const expectedRole: Role = route.data.role;
          // if (expectedRole && user.role !== expectedRole) {
          //   this.showAuthError();
          //   return this.router.navigateByUrl('/home');
          // }
          return true;
        }
        return this.router.navigateByUrl('/login');
      }));
  }

  async showAuthError() {
    const alert = await this.alertController.create({
      header: 'Authorization error',
      message: 'You don\'t have enough rights to access this page!',
      buttons: ['Ok']
    });
    await alert.present();
  }

}
