import { Customer } from ".";
import { OrderItem } from "./order-item.model";

export class Order {
    constructor(
        public id?: number,
        public date?: Date,
        public customer?: Customer,
        public items?: OrderItem[]
    ) {}
}
