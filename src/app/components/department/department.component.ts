import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService, Department} from "../../services/data.service";
import {FireDataService} from "../../services/fire-data.service";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {

  @Input() department: Department;
  @Input() isNew: boolean;
  @Output() onAdd = new EventEmitter();
  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  title: string;
  employeesQuantity: number;

  constructor(
    private dataService: DataService,
    private fireDataService: FireDataService
  ) { }

  ngOnInit() {
    if (this.isNew) {
      this.department = {
        id: null,
        name: '',
        type: '',
      };
      this.employeesQuantity = 0;
      this.title = 'New department';
    } else {
      this.fireDataService.getEmployees(this.department.id).subscribe(employees => this.employeesQuantity = employees.length);
      // this.dataService.getEmployeesQuantity(this.department.id).subscribe(quantity => this.employeesQuantity = +quantity)
    }
  }

  saveDepartment() {
    this.fireDataService.updateDepartment(this.department);
    this.onSave.emit();
    // this.dataService.updateDepartment(this.department).subscribe(response => console.log(response));
  }
}
