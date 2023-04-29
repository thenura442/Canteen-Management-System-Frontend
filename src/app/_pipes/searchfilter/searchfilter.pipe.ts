import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(items: any, filter: string): any {
    if(!items || !filter){
      return items;
    }

    console.log(items)
    return items.filter((items : any) => items.item_name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  }

}
