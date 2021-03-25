import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Department} from "../../service/data-getter.service";

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

  constructor() { }

  ngOnInit() {
    if (this.isNew) {
      this.department = {
        id: null,
        name: '',
        type: '',
        employeesQuantity: null
      };
      this.title = 'New department';
    }
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
}
