import { Pipe, PipeTransform,Injectable } from '@angular/core';
import{IEmployee} from './IEmplolyee';
@Pipe({
 name: 'sortpipe'
})

@Injectable()

export class SortPipe implements PipeTransform {
     
        transform(emps: Array<any>, args?: any): any {
            emps = emps || [];  // set records to an empty array if undefined

            return emps.sort(function(a, b){
                if(a[args.property] < b[args.property]){
                    return -1 * args.direction;
                }
                else if( a[args.property] > b[args.property]){
                    return 1 * args.direction;
                }
                else{
                    return 0;
                }
            });
        };


  }

    
