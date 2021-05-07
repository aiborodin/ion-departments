import { Component, OnInit } from '@angular/core';
import {DataService, Department, Employee} from "../../service/data.service";
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
  currPage: number;
  totalPages: number;
  showNew: boolean = false;
  showEdit: number = -1;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(parameters => {
      this.depId = parameters.depId;
      this.depName = parameters.depName;
    });
  }
  ngOnInit() {
    this.refreshData();
  }
  refreshData(refresher?: any) {
    this.employees = [];
    this.currPage = 1;
    this.totalPages = 0;
    this.addData(refresher);
  }
  addData(refresher: any) {
    if (this.totalPages === 0) {
      this.dataService.getEmployeesResponse(this.depId, this.currPage).subscribe(resp => {
        this.totalPages = +resp.headers.get('x-pagination-page-count')[0];
        this.employees = resp.body;
        this.currPage++;
      });
    } else if (this.currPage <= this.totalPages){
      this.dataService.getEmployees(this.depId, this.currPage).subscribe(employees => {
        this.employees = this.employees.concat(employees);
        this.currPage++;
      });
    }
    if (refresher) {
      refresher.target.complete();
    }
  }
  addEmployee(employee: Employee) {
    this.dataService.addEmployee(employee).subscribe(
      employee => {
        console.log('Added employee');
        console.log(employee);
        this.refreshData();
      }
    );
    this.showNew = false;
  }
  deleteEmployee(id: number) {
    this.dataService.deleteEmployee(id).subscribe(
      response => {
        console.log('Deleted employee with id: ' + id);
        this.refreshData();
      }
    );
  }
}
