import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AlertController} from "@ionic/angular";
import {AuthService, Role} from "../service/auth.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

    return this.authService.user.pipe(
      map(user => {
        console.log("In guard", user);
        const loggedIn = user !== null;
        if (!loggedIn) {
          return this.router.navigateByUrl('/login');
        }
        const expectedRole: Role = route.data.role;

        if (expectedRole !== undefined && user.role !== expectedRole) {
          this.showAuthError();
          return this.router.navigateByUrl('/home');
        }
        return true;
      })
    )
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
