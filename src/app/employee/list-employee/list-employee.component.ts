import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from './list-employee.service';
import { IEmployee } from './IEmplolyee';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {

  public employees: IEmployee[];

  searchText;
  p: number = 1;
  direction: number;
  column: any;
  isDesc: boolean = false;

  constructor(private _empservice: EmployeeService, private _router: Router, private _routeId: ActivatedRoute) {


  }

  ngOnInit() {
    

    this._empservice.getEmplyee()
      .subscribe(data => this.employees = data.reverse()

      );


  }

  editbutton(empId: number) {
    this._router.navigate(['employee/edit', empId]);
  }



  deleteFieldValue(id, index) {
    // console.log(index);
    this._empservice.deleteEmployee(id)
      .subscribe(data => console.log(data))
    this.employees.splice(index, 1);

  }
  onHover(e) {
    console.log(e, this.searchText);

  }
  // Change sort function to this: 
  sort(property) {
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }


}

