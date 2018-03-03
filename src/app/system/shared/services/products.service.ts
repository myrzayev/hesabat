import { Http, Response } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseApi } from '../../../shared/core/base-api';
import { Product } from '../models/product.model';

@Injectable()
export class ProductsService extends BaseApi {
  constructor(public http: Http) {
    super(http);
  }

  addProduct(product: Product): Observable<Product> {
    return this.post('products', Product);
  }

  getProducts(): Observable<Product[]> {
    return this.get('products');
  }

  updateProduct(product: Product): Observable<Product> {
    return this.put(`products/${product.id}`, Product);
  }

  deleteProductById(id: number): Observable<Product> {
    return this.get(`products/${id}`);
  }

  getProductById(id: string): Observable<Product> {
    return this.get(`products/${id}`);
  }

  searchProducts(term: string): Observable<Product[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
      { params: new HttpParams().set('barcode', term) } : {};

    return this.get(`products/${term}`);
  }
}
