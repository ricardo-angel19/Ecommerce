import { Component, OnInit } from '@angular/core';
import { ProductRepositoryService } from '../model/product-repository.service';
import { Product } from '../model/product';
import { Cart } from '../model/cart';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  public selectedCategory = null;
  public selectedVendor = null;
  public selectedScale = null;
  public productsPerPage = 12;
  public selectedPage = 1;


  constructor(private productsRespositoryService: ProductRepositoryService, private cart : Cart) {}

  ngOnInit() {
  }

  get products(): Product[] {  
    const pageIndex = (this.selectedPage -1) * this.productsPerPage;  
    return this.productsRespositoryService.getProducts(this.selectedCategory, this.selectedScale, this.selectedVendor)
    .slice(pageIndex, pageIndex + this.productsPerPage);
  }

  get categories(): string[] {    
    return this.productsRespositoryService.getCategories();
  }

  get vendors(): string[] {    
    return this.productsRespositoryService.getVendors();
  }

  get scales(): string[] {    
    return this.productsRespositoryService.getScales();
  } 

  changeCategory(newCategory?: string){    
    this.selectedScale = null;
    this.selectedVendor = null;
    this.selectedCategory = null;
    this.selectedPage = 1; 
    this.selectedCategory = newCategory;

  }

  changeVendor(newVendor?: string){ 
    this.selectedScale = null;
    this.selectedVendor = null;
    this.selectedCategory = null;
    this.selectedPage = 1;    
    this.selectedVendor= newVendor;
  }

  changeScale(newScale?: string){  
    this.selectedScale = null;
    this.selectedVendor = null;
    this.selectedCategory = null;
    this.selectedPage = 1;    
    this.selectedScale= newScale;
  }

  get pageNumbers(): number[] {
    return Array(Math.ceil(this.productsRespositoryService.getProducts(this.selectedCategory, this.selectedScale, this.selectedVendor).length / this.productsPerPage))
      .fill(0).map((x, i) => i + 1); //[1,2,3,4,5,6,7,8,9.10]

  }

  changePage(newNumber: number) {
    this.selectedPage = newNumber; 
  }

  changePageSize(newSize: number){
    this.productsPerPage = newSize; 
    this.changePage(1);
  }
  add(product : Product){
    return this.cart.addLine(product);
  }
}
