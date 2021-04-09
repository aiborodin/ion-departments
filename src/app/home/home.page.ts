import { Component } from '@angular/core';
import {DataGetterService, Department} from "../service/data-getter.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userName;
  departments: Department[];
  showNew: boolean = false;
  showEdit: number = -1;
  extraData: string;

  constructor(
    private dataService: DataGetterService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    dataService.getDepartments().subscribe(
      departments => this.departments = departments
    );
    this.userName = dataService.getUser();
    route.params.subscribe(params => this.extraData = params.data);
  }
  delete(idx: number) {
    this.dataService.deleteDepartment(idx);
  }
  addDepartment(department: Department) {
    this.dataService.addDepartment(department);
    this.showNew = false;
  }
  transferToDataSender() {
    this.router.navigate(['data-sender', {data: this.extraData}]);
  }
}
