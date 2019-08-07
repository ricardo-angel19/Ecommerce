import { Injectable } from '@angular/core';
import { Product } from './product';
@Injectable()
export class Cart {
    private lines: CartLine[] = [];
    public itemCount = 0;
    public cartPrice = 0;

    addLine(product: Product, quantity: number = 1){
        const line = this.lines.find(line => line.product.productCode === product.productCode)
    if (line != undefined) {
      line.quantity += quantity;
    } else {
      this.lines.push(new CartLine(product, quantity));
    }
    this.recarculate();
  }

  recarculate() {
      this.itemCount = 0;
      this.cartPrice = 0;
      this.lines.forEach(l => {
          this.itemCount += l.quantity; 
          this.cartPrice += (l.quantity * l.product.MSRP);
      }) 
  }
  updateProduct(product : Product, quantity : number){
    let line = this.lines.find(line => line.product.productCode === product.productCode);
    if (line !== undefined){
     line.quantity = Number(quantity);
    }
    this.recarculate();
  }

  deleteProduct(productCode : string){
    let index = this.lines.findIndex(line => line.product.productCode === productCode);
    this.lines.splice(index, 1);
    this.recarculate();
  }

}

export class CartLine {
    constructor(public product: Product, public quantity: number) {}
        
        get lineTotal(): number  {
            return this.quantity * this.product.MSRP;
        }
}