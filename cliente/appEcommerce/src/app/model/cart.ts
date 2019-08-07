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

}

export class CartLine {
    constructor(public product: Product, public quantity: number) {}
        
        get lineTotal(): number  {
            return this.quantity * this.product.MSRP;
        }
}