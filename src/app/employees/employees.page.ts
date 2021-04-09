import { Component, OnInit } from '@angular/core';
import {DataGetterService, Employee} from "../service/data-getter.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NavController} from "@ionic/angular";
import {Subject} from "rxjs";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {

  depId: number;
  depName: string;
  employees: Employee[];

  constructor(
    private dataService: DataGetterService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(parameters => {
      this.depId = +parameters.depId;
      this.depName = this.dataService.getDepartment(this.depId).name;
    });
    this.dataService.getEmployees(this.depId).subscribe(employees => this.employees = employees);
  }

  sendDataToHome(dataToHome: string) {
    this.router.navigate(['home', {data: dataToHome}]);
  }
}
