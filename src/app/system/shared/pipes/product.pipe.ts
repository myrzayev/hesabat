import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../models/product.model';

@Pipe({
  name: 'myrProduct'
})
export class ProductPipe implements PipeTransform {
  transform(items: Product[]) {
    return items.filter(product => product.id);
  }
}
