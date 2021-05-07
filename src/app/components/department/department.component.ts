import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService, Department} from "../../service/data.service";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {

  @Input() department: Department;
  @Input() isNew: boolean;
  @Output() addDep = new EventEmitter();
  @Output() cancelAddingDep = new EventEmitter();
  title: string;
  employeesQuantity: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    if (this.isNew) {
      this.department = {
        id: null,
        name: '',
        type: '',
      };
      this.title = 'New department';
    }
    this.employeesQuantity = this.dataService.getEmployeesQuantity(this.department.id);
  }

  addNew() {
    if (this.isNew) {
      this.addDep.emit(this.department);
    }
  }
  cancelAdding() {
    if (this.isNew) {
      this.cancelAddingDep.emit();
    }
  }
  saveDepartment() {
    this.dataService.updateDepartment(this.department).subscribe(response => console.log(response));
  }
}
