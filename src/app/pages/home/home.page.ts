import {Component, OnInit} from '@angular/core';
import {DataService, Department} from "../../service/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userName;
  departments: Department[];
  showNew: boolean = false;
  showEdit: number = -1;
  extraData: string;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    route.params.subscribe(params => this.extraData = params.data);
    this.authService.user.subscribe(user => this.userName = user.username);
  }
  ngOnInit() {
    this.dataService.getDepartments().subscribe(
      departments => this.departments = departments
    );
  }
  delete(id: number) {
    this.dataService.deleteDepartment(id).subscribe(
      response => {
        console.log('Deleted department with id: ' + id);
        this.dataService.getDepartments().subscribe(departments => this.departments = departments);
      }
    );
  }
  addDepartment(department: Department) {
    this.dataService.addDepartment(department).subscribe(
      department => {
        console.log('Added department');
        console.log(department);
        this.dataService.getDepartments().subscribe(departments => this.departments = departments);
      }
    );
    this.showNew = false;
  }
  transferToDataSender() {
    this.router.navigate(['data-sender', {data: this.extraData}]);
  }
}
