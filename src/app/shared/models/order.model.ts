import { Client } from ".";
import { OrderItem } from "./order-item.model";

export class Order {
    constructor(
        public id?: number,
        public date?: Date,
        public client?: Client,
        public items?: OrderItem[]
    ) {}
}
