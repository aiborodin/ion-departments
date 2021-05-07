import { Component, OnInit } from '@angular/core';
import {DataService} from "../../service/data.service";
import {NavController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-data-sender',
  templateUrl: './data-sender.page.html',
  styleUrls: ['./data-sender.page.scss'],
})
export class DataSenderPage implements OnInit {
  textData: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.textData = params.data);
  }

  ngOnInit() {
  }

  returnDataToHome(): void {
    this.router.navigate(['home', {data: this.textData}])
  }
}
