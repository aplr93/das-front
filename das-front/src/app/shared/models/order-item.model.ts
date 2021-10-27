import { Product } from "./product.model";

export class OrderItem {
    constructor(
        public product? : Product,
        public quantity? : number
    ) {}
}
