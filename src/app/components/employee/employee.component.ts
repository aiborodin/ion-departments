import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService, Department, Employee} from "../../service/data.service";
import {AlertController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {

  @Input() employee: Employee;
  @Input() isNew: boolean;
  @Output() addEmployee = new EventEmitter();
  @Output() cancelAdding = new EventEmitter();
  @Output() saveEvent = new EventEmitter();
  title: string;
  depId: number;
  departments: Department[];

  constructor(
    private dataService: DataService,
    private alertController: AlertController,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(parameters => {
      this.depId = +parameters.depId;
    });
  }

  ngOnInit() {
    if (this.isNew) {
      this.employee = {
        id: null,
        name: null,
        age: null,
        gender: null,
        department_id: this.depId
      };
      this.title = 'New employee';
    }
    this.dataService.getDepartments()
      .subscribe(departments => this.departments = departments);
  }

  addNew() {
    if (this.isNew) {
      this.addEmployee.emit(this.employee);
    }
  }
  cancel() {
    if (this.isNew) {
      this.cancelAdding.emit();
    }
  }
  save() {
    this.dataService.updateEmployee(this.employee).subscribe(updated => {
      console.log(updated);
      this.saveEvent.emit();
    }, error => {
      this.showError(error.error.message);
    });
  }
  async showError(message: string) {
    const alert = await this.alertController.create({
      header: 'Server error!',
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }
}
