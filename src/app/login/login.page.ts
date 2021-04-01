import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataGetterService} from "../service/data-getter.service";
import {AlertController} from "@ionic/angular";
import {log} from "util";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private dataGetter: DataGetterService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  login(userName: string) {
    if (this.dataGetter.userExists(userName)) {
      this.dataGetter.setUser(userName);
      this.router.navigate(['/home']);
    } else {
      this.noUserAlert(userName);
    }
  }

  async noUserAlert(userName: string) {
    const alert = await this.alertController.create({
      header: 'Attention!',
      subHeader: 'Authentication error',
      message: `User ${userName} doesn't exist. Incorrect user name.`,
      buttons: ['Ok']
    });
    await alert.present();
  }
}
