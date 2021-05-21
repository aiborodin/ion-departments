import { Component, OnInit } from '@angular/core';
import {DataService, Employee} from "../../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User, Role, AuthService} from "../../services/auth.service";
import {FireDataService} from "../../services/fire-data.service";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {

  depId: string;
  depName: string;
  employees: Employee[];
  currPage: number;
  totalPages: number;
  showNew: boolean = false;
  showEdit: number = -1;
  user: User;
  Role = Role;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private fireDataService: FireDataService,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit() {
    this.route.params.subscribe(parameters => {
      this.depId = parameters.depId;
      this.depName = parameters.depName;
    });
    this.authService.user.subscribe(user => this.user = user);
    this.fireDataService.getEmployees(this.depId).subscribe(employees => this.employees = employees);
    //this.refreshData();
  }
  // refreshData(refresher?: any) {
  //   this.employees = [];
  //   this.currPage = 1;
  //   this.totalPages = 0;
  //   this.addData(refresher);
  // }
  // addData(refresher: any) {
  //   if (this.totalPages === 0) {
  //     this.dataService.getEmployeesResponse(this.depId, this.currPage).subscribe(resp => {
  //       this.totalPages = +resp.headers.get('x-pagination-page-count')[0];
  //       this.employees = resp.body;
  //       this.currPage++;
  //     });
  //   } else if (this.currPage <= this.totalPages){
  //     this.dataService.getEmployees(this.depId, this.currPage).subscribe(employees => {
  //       this.employees = this.employees.concat(employees);
  //       this.currPage++;
  //     });
  //   }
  //   if (refresher) {
  //     refresher.target.complete();
  //   }
  // }
  // addEmployee(employee: Employee) {
  //   this.dataService.addEmployee(employee).subscribe(
  //     employee => {
  //       console.log('Added employee');
  //       console.log(employee);
  //       this.refreshData();
  //     }
  //   );
  //   this.showNew = false;
  // }
  // deleteEmployee(id: number) {
  //   this.dataService.deleteEmployee(id).subscribe(
  //     response => {
  //       console.log('Deleted employee with id: ' + id);
  //       this.refreshData();
  //     }
  //   );
  // }
}
