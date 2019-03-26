import { Pipe, PipeTransform,Injectable } from '@angular/core';
import{IEmployee} from './IEmplolyee';
@Pipe({
 name: 'searchfilter'
})

@Injectable()

export class SearchFilterPipe implements PipeTransform {
    transform(emps: IEmployee[], searchText: string):IEmployee[]{
    if(!emps || !searchText){
      
      return emps;
    }

    else{
      return emps.filter(emp=>emp.fullname.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);

    }
  }

    
}