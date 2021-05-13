import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Department} from "./data.service";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FireDataService {

  private departmentsCollection: AngularFirestoreCollection<Department>;
  departments: Observable<any[]>;

  constructor(private afs: AngularFirestore) {
    this.departmentsCollection = afs.collection<Department>('departments');
    this.departments = this.departmentsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Department;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }
}
