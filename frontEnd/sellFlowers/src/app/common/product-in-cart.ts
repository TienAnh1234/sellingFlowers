import { Category } from "./category";
import { Product } from "./product";

export class ProductInCart {


    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity: number;
    constructor(product: Product){
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.imageUrl = product.imageUrl;
        this.quantity = 1;

    }

}
