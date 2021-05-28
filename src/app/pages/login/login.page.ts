import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";
import {AuthService, Role, User} from "../../services/auth.service";
import {FireDataService} from "../../services/fire-data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fireDataService: FireDataService,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  login() {
    this.fireDataService.logIn({
      username: this.username,
      password: this.password
    }).then(
      res => {
        this.router.navigateByUrl('/home');
      },
      err => this.showError(err.message))
    // this.authService.login({
    //   username: this.username,
    //   password: this.password
    // }).subscribe(user => {
    //   this.authService.setUser(user);
    //   if (user.role === Role.ADMIN) {
    //     this.router.navigate(['/admin-dashboard/users']);
    //   } else {
    //     this.router.navigate(['/home']);
    //   }
    // }, error => {
    //   this.showError(error.error.message);
    // })
  }

  async showError(message: string) {
    const alert = await this.alertController.create({
      header: 'Attention!',
      subHeader: 'Authentication error',
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }
}
