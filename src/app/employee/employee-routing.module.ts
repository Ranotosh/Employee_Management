import { NgModule } from '@angular/core';
import { RouterModule,Routes} from '@angular/router';

import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ListEmployeeComponent }   from './list-employee/list-employee.component';


const approute:Routes=[
    // {path:'employee',children:[
       
        {path:'create',component:CreateEmployeeComponent },
        {path:'edit/:id',component:CreateEmployeeComponent },
        {path:'list' ,component:ListEmployeeComponent},

    // ]}


]

@NgModule({

  imports: [
  
    RouterModule.forChild(approute),
  ],
  exports: [RouterModule],
})
export class EmployeeRoutingModule { }


