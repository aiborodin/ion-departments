import { Component } from '@angular/core';
import {DataGetterService, Department} from "../service/data-getter.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  departments: Department[];
  showNew: boolean = false;
  showEdit: number = -1;

  constructor(private dataService: DataGetterService) {
    dataService.getDepartments().subscribe(
      departments => this.departments = departments
    );
  }

  delete(idx: number) {
    this.dataService.deleteDepartment(idx);
  }

  addDepartment(department: Department) {
    this.dataService.addDepartment(department);
    this.showNew = false;
  }
}
