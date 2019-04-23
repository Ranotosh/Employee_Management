import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ISkill } from './ISkill';
import { IEmployee } from './IEmplolyee';

import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable()

export class EmployeeService {

    emps: IEmployee[];
    constructor(private _httpclient: HttpClient) { }

    getEmplyee() {
        return this._httpclient.get<any>("http://localhost:4000/employees");
    }
    getEmplyeeId(id) {
        return this._httpclient.get<any>("http://localhost:4000/employees/" + id);
    }
    addEmployee(employee: IEmployee) {

        return this._httpclient.post<any>("http://localhost:4000/employees/", employee, {
            headers: new HttpHeaders({
                'Content-type': 'application/json'
            })
        });


    }
    updateEmployee(employee) {
        console.log(employee);
        return this._httpclient.put<any>("http://localhost:4000/employees/" + employee.id + "/", employee, {
            headers: new HttpHeaders({
                'Content-type': 'application/json'
            })
        });
    }
    deleteEmployee(id: number) {
        return this._httpclient.delete<any>("http://localhost:4000/employees/" + id);
    }
}