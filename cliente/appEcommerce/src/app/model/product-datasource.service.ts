import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const PROTOCOL = 'http';

@Injectable({
  providedIn: 'root'
})
export class ProductDatasourceService {

  private basUrl: string;

  constructor(private httpClient: HttpClient) { 
    this.basUrl = `${PROTOCOL}://${location.hostname}/Ecommerce/api`;
  };

  getProducts(): any {
    return this.httpClient.get(this.basUrl + '/products');
  }
}
