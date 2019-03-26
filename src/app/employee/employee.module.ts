import { NgModule } from '@angular/core';

import { EmployeeRoutingModule } from './employee-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';


import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { SharedModule } from '../shared/shared.module';

import { SearchFilterPipe } from './list-employee/search.pipe';
import { SortPipe } from './list-employee/sort.pipe';

@NgModule({
  declarations: [
    CreateEmployeeComponent,
    ListEmployeeComponent,
    SearchFilterPipe,
    SortPipe

  ],
  imports: [


    EmployeeRoutingModule,
    SharedModule,
    NgxPaginationModule

  ],

})
export class EmployeeModule { }


